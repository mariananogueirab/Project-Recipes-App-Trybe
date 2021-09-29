import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import { getDrinkByIndredients } from '../services/FetchApiAll';
import FetchApiDrinks from '../services/FetchApiDrinks';

function ExploreDrinksIngredients() {
  const [ingredient, setIngredient] = useState([]);
  const { setSearchRecipes } = useContext(RecipesContext);
  const number = 12;
  // faz a requisição para api de lista ingredientes de bebidas
  useEffect(() => {
    async function getIngredients() {
      const drinks = await getDrinkByIndredients();
      setIngredient(drinks);
    }
    getIngredients();
  }, []);
  // renderiza os cards conforme o retorno da api e insere link aos cards para dorecionamento á tela principal de receita de acordo o ingrediente selecionado
  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" hasSearchIcon={ false } />
      {
        ingredient.map(({ strIngredient1 }, index) => (
          <Link
            key={ index }
            to="/bebidas"
            onClick={ () => FetchApiDrinks(
              strIngredient1,
              'ingredient',
              setSearchRecipes,
            ) }
          >
            <div data-testid={ `${index}-ingredient-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                alt={ strIngredient1 }
              />
              <h2 data-testid={ `${index}-card-name` }>{ strIngredient1 }</h2>
            </div>
          </Link>
        )).slice(0, number)
      }
      <Footer />
    </div>
  );
}
export default ExploreDrinksIngredients;
