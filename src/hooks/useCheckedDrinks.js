import React, { useEffect, useState } from 'react';

function useCheckedDrinks(ingredients) {
  const newIngredients = ingredients.reduce((acc, value) => {
    acc = [...acc, { ingredient: value, checked: false }];
    return acc;
  }, []);

  const [localDrink, setLocalDrink] = useState(newIngredients);

  const toggleCheckBoxChange = ({ target }) => {
    if (localDrink.find(({ ingredient }) => ingredient === target.name)) {
      setLocalDrink(localDrink.map((objct) => {
        if (objct.ingredient === target.name) {
          objct.checked = !objct.checked;
        }
        return objct;
      }));
    }
  };

  const ingredientsList = localDrink.map(({ ingredient, checked }, index) => (

    <li key={ ingredient } data-testid={ `${index}-ingredient-step` }>
      <div>
        <input
          type="checkbox"
          id={ index }
          defaultChecked={ checked ? 'checked' : false }
          // checked={ checked }
          name={ ingredient }
          onClick={ toggleCheckBoxChange }
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

    const foodProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (foodProgressLocal) {
      setLocalDrink(foodProgressLocal.cocktails.cocktailID);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  }, []);

  useEffect(() => {
    const foodProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...foodProgressLocal,
      cocktails: { cocktailID: localDrink } }));
  }, [localDrink]);

  return ingredientsList;
}

export default useCheckedDrinks;
