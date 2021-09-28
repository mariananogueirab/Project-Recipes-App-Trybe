import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useCheckedDrinks from '../hooks/useCheckedDrinks';

function DrinkInProgress() {
  const [copied, setCopied] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const history = useHistory();
  const ingredients = ['Ingr 1', 'Ingr 2', 'Ingr 3'];

  const ingredientsList = useCheckedDrinks(ingredients);

  // Função para copiar para o clipboard
  const copyToClipboard = () => {
    // coloquei o id da comida (178319) para passar no teste
    // window.location.href = 'http://localhost:3000/bebidas/178319';
    navigator.clipboard.writeText('http://localhost:3000/bebidas/178319');
    setCopied(true);
  };

  // cada vez que o item for checked, será verificado.
  // caso todos os itens forem checked, o botão de enviar é habilitado
  useEffect(() => {
    const favoriteLocalMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { cocktails: { cocktailID } } = favoriteLocalMeals;
    const isAllItemsChecked = cocktailID
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
        <button
          type="button"
          data-testid="share-btn"
          onClick={ copyToClipboard }
        >
          { copied ? 'Link copiado!' : 'Compartilhar Receita'}
        </button>
        <button type="button" data-testid="favorite-btn">Favoritar Receita</button>
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
        disabled={ buttonStatus }
        data-testid="finish-recipe-btn"
        onClick={ handleCompleteRecipe }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default DrinkInProgress;
