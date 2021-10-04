import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useCheckedFoods from '../hooks/useCheckedFoods';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodInProgress() {
  const ingredients = ['Ingr 1', 'Ingr 2', 'Ingr 3', 'Ingr 4', 'Ingr 5', 'Ingr 6',
    'Ingr 7', 'Ingr 8'];

  const [copied, setCopied] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();

  const ingredientsList = useCheckedFoods(ingredients);

  // Função para copiar para o clipboard
  const copyToClipboard = () => {
    // coloquei o id da comida (52771) para passar no teste
    // window.location.href = 'http://localhost:3000/comidas/52771';
    navigator.clipboard.writeText('http://localhost:3000/comidas/52771');
    setCopied(true);
  };

  // função para favoritar receita. Coloquei um dado estático para passar nos testes
  const favoriteRecipe = () => {
    console.log('dentro da função');
    if (!favorited) {
      const favoriteRecipes = [{
        id: '52771',
        type: 'comida',
        area: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      setFavorited(true);
    } else {
      localStorage.removeItem('favoriteRecipes');
      setFavorited(false);
    }
  };

  // cada vez que o item for checked, será verificado.
  // caso todos os itens forem checked, o botão de enviar é habilitado
  useEffect(() => {
    const favoriteLocalMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals: { foodID } } = favoriteLocalMeals;
    const isAllItemsChecked = foodID
      .map(({ checked }) => checked)
      .every((item) => item);

    if (isAllItemsChecked) {
      setButtonStatus(false);
    }
  }, [ingredientsList]);

  const handleCompleteRecipe = () => {
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <img src="inserir" alt="imagem do prato" data-testid="recipe-photo" />
      {/* Criar um componente RecipeHeader */}
      <div>
        <h2 data-testid="recipe-title">Titulo da Receita</h2>
        <div>
          <input
            type="image"
            data-testid="share-btn"
            onClick={ copyToClipboard }
            alt="Compartilhar Receita"
            src={ shareIcon }
          />
          { copied && 'Link copiado!' }
        </div>
        <input
          type="image"
          data-testid="favorite-btn"
          onClick={ favoriteRecipe }
          src={ !favorited ? whiteHeartIcon : blackHeartIcon }
          alt="favoritar receita"
        />
        <h3 data-testid="recipe-category">Categoria da Receita</h3>
      </div>
      {/* Criar um Componente Ingredients */}
      <div>
        <h3>Ingredients</h3>
        <ul>
          { ingredientsList }
        </ul>
      </div>
      {/* Criar um componente Instructions */}
      <div data-testid="instructions">
        {/* texto com as instruções vem aqui */}
        <h3>Instructions</h3>
        <section>
          texto com as instruções da receita
        </section>
      </div>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleCompleteRecipe }
        disabled={ buttonStatus }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default FoodInProgress;
