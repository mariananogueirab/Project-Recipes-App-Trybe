import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../components/ShareIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import Button from '../components/Button'

function DrinksDetails({ match: { params: { id } } }) {
  const [drink, getDrink] = useState({});
  const [loading, setLoading] = useState(false);
  const API_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

  useEffect(() => {
    async function getDrinkById() {
      const { drinks } = await fetch(`${API_BY_ID}${id}`)
      .then((res) => res.json());
      getDrink(drinks[0]);
      setLoading(true);
    }
    getDrinkById();
  }, [id]);

  function getIngredientsAndMeasures() {
    let ingredients = [];
    if(loading) {
      for (let indice = 1; indice <= 20; indice += 1) {
        const strIng = `strIngredient${indice}`;
        const strMeas = `strMeasure${indice}`;
        const strIngAndMeas = `${drink[strIng]} - ${drink[strMeas]}`;
        ingredients = [...ingredients, strIngAndMeas];
      }
      const finalingredients = ingredients.filter((ingredient) => (ingredient !== "null - null") && ingredient !== "undefined - undefined");
      console.log(finalingredients)
      return finalingredients;
    }
  }
  const ingredients = getIngredientsAndMeasures();
  return (
      <div>
        {loading ? (
          <div>
          <h1 data-testid="drink-title">{drink.strDrink}</h1>
          <img
            data-testid="drink-photo"
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
          />
          <p data-testid="drink-category">{drink.strCategory}</p>
          <p>Ingredientes:</p>
          <ul>
            {ingredients.map((ingredient, index) => <li key={ index }>{ingredient}</li>)}
          </ul>
          <p data-testid="instructions">{drink.strInstructions}</p>
          <span>Receitas Recomendadas</span>
          <Button data-testid="start-drink-btn">Iniciar Receita</Button>
          <ShareIcon />
          <FavoriteIcon />
          </div>) : 'loading'}
    </div>
  );
}

DrinksDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DrinksDetails;
