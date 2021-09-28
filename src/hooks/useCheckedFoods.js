import React, { useEffect, useState } from 'react';

function useCheckedFoods(ingredients) {
  const newIngredients = ingredients.reduce((acc, value) => {
    acc = [...acc, { ingredient: value, checked: false }];
    return acc;
  }, []);

  const [localFood, setLocalFood] = useState(newIngredients);

  const toggleCheckBoxChange = ({ target }) => {
    if (localFood.find(({ ingredient }) => ingredient === target.name)) {
      setLocalFood(localFood.map((objct) => {
        if (objct.ingredient === target.name) {
          objct.checked = !objct.checked;
        }
        return objct;
      }));
    }
  };

  // ATTENTION: aqui, temos um pequeno bug na renderização dos itens checked
  const ingredientsList = localFood.map(({ ingredient, checked }, index) => (
    <li key={ ingredient }>
      <label htmlFor={ index } data-testid={ `${index}-ingredient-step` }>
        <input
          type="checkbox"
          id={ index }
          defaultChecked={ checked }
          // checked={ checked }
          name={ ingredient }
          onChange={ toggleCheckBoxChange }
        />
        { ingredient }
      </label>
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
      setLocalFood(foodProgressLocal.meals.foodID);
    } else {
      localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
    }
  }, []);

  useEffect(() => {
    const foodProgressLocal = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...foodProgressLocal,
      meals: { foodID: localFood } }));
  }, [localFood]);

  return ingredientsList;
}

export default useCheckedFoods;
