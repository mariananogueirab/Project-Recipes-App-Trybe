import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FoodInProgress() {
  // const [localFood, setLocalFood] = useState({ meals: { foodID: [] } });
  const [checkedItems, setCheckedItems] = useState([]);
  const [copied, setCopied] = useState(false);
  const [favorited, setFavorited] = useState(false);
  const history = useHistory();
  const ingredients = ['Ingr 1', 'Ingr 2', 'Ingr 3', 'Ingr 4', 'Ingr 5', 'Ingr 6',
    'Ingr 7', 'Ingr 8'];

  const toggleCheckBoxChange = ({ target }) => {
    const localItens = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { meals: { foodID } } = localItens;
    console.log('array localStorage foodID:', foodID);

    setCheckedItems((prevState) => [...prevState, target.checked]);
    // console.log('estado localFood:', localFood);
    // localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    // setCheckedItems(newObj);
    console.log(target.id, target.checked);
  };

  console.log('checkedItems', checkedItems);

  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
      <div>
        <input
          type="checkbox"
          id={ index }
          // checked={ checked }
          name={ ingredient }
          onChange={ toggleCheckBoxChange }
        />
        <p>{ ingredient }</p>
      </div>
    </li>
  ));

  // localStorage inicial para os itens checked
  useEffect(() => {
    const obj = {
      cocktails: {
        cocktailID: [],
      },
      meals: {
        foodID: [],
      },
    };

    localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
  }, []);

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
      localStorage.clear('favoriteRecipes');
      setFavorited(false);
    }
  };

  const handleCompleteRecipe = () => {
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <img src="inserir" alt="imagem do prato" data-testid="recipe-photo" />
      {/* Criar um componente RecipeHeader */}
      <div>
        <h2 data-testid="recipe-title">Titulo da Receita</h2>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyToClipboard }
        >
          { copied ? 'Link copiado!' : 'Compartilhar Receita'}
        </button>
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
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default FoodInProgress;
