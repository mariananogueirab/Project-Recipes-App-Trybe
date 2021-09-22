import React from 'react';

function FoodInProgress() {
  const ingredients = ['Ingr 1', 'Ingr 2', 'Ingr 3', 'Ingr 4', 'Ingr 5', 'Ingr 6',
    'Ingr 7', 'Ingr 8'];

  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={ ingredient } data-testid={ `${index}-ingredient-step}` }>
      <input type="checkbox" name={ ingredient } />
    </li>
  ));

  return (
    <div>
      <img src="inserir" alt="imagem do prato" data-testid="recipe-photo" />
      {/* Criar um componente RecipeHeader */}
      <div>
        <h2 data-testid="recipe-title">Titulo da Receita</h2>
        <button type="button" data-testid="share-btn">Compartilhar Receita</button>
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
        <section>
          texto com as instruções da receita
        </section>
      </div>
      <button type="button" data-testid="finish-recipe-btn">
        Finalizar Receita
      </button>
    </div>
  );
}

export default FoodInProgress;
