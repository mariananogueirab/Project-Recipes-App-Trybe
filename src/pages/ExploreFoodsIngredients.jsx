import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { getFoodByIndredients } from '../services/FetchApiAll';
import FetchApiFoods from '../services/FetchApiFoods';

function ExploreFoodsIngredients() {
  const [ingredient, setIngredient] = useState([]);
  const { setSearchRecipes } = useContext(RecipesContext);
  const number = 12;
  // faz a requisição para api de lista ingredientes de comidas
  useEffect(() => {
    async function getIngredients() {
      const meals = await getFoodByIndredients();
      setIngredient(meals);
    }
    getIngredients();
  }, []);
  // renderiza os cards conforme o retorno da api e insere link aos cards para dorecionamento á tela principal de receita de acordo o ingrediente selecionado
  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" hasSearchIcon={ false } />
      {
        ingredient.map(({ strIngredient }, index) => (
          <Link
            key={ index }
            to="/comidas"
            onClick={ () => FetchApiFoods(strIngredient, 'ingredient', setSearchRecipes) }
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                alt={ strIngredient }
              />
              <h2 data-testid={ `${index}-card-name` }>{ strIngredient }</h2>
            </div>
          </Link>
        )).slice(0, number)
      }
      <Footer />
    </div>
  );
}
export default ExploreFoodsIngredients;
