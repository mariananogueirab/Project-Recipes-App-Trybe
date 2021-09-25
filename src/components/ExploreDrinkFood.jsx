import React from 'react';
import { useHistory } from 'react-router';
import { getDrinkRandom, getFoodRandom } from '../services/FetchApiAll';
import Button from './Button';

function ExploreDrinkFood() {
  const history = useHistory();
  const route = useHistory().location.pathname;
  const bebidas = '/explorar/bebidas';

  // rederiza o botão somente se a rota não for de bebidas
  const renderButton = () => (
    (route !== bebidas)
    && <Button
      testid="explore-by-area"
      onClick={ () => history.push('/explorar/comidas/area') }
      label="Por Local de Origem"
    />
  );

  // renderiza para tela de ingredintes conforme a rota seja de bebida ou comida
  const renderPathIngredient = () => {
    if (route !== bebidas) {
      return history.push('/explorar/comidas/ingredientes');
    }
    return history.push('/explorar/bebidas/ingredientes');
  };

  // renderiza para pagina de detalhes de uma comida ou bebida aleatoria após chamada da api
  const renderPathSurprise = async (e) => {
    e.preventDefault();
    const meals = await getFoodRandom();
    const drinks = await getDrinkRandom();
    if (route !== bebidas && meals) {
      return history.push(`/comidas/${meals[0].idMeal}`);
    }
    return history.push(`/bebidas/${drinks[0].idDrink}`);
  };

  return (
    <form>
      <Button
        testid="explore-by-ingredient"
        onClick={ renderPathIngredient }
        label="Por Ingredientes"
      />
      {
        renderButton()
      }
      <Button
        testid="explore-surprise"
        onClick={ renderPathSurprise }
        label="Me Surpreenda!"
      />
    </form>
  );
}

export default ExploreDrinkFood;
