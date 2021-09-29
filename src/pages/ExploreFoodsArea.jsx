import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {
  getApiByAllFoods, getFoodByArea, getFoodFilterArea } from '../services/FetchApiAll';

function ExploreFoodsArea() {
  const [area, setArea] = useState([]);
  const [searchArea, setSearchArea] = useState('All');
  const [filteredArea, setFilterArea] = useState([]);
  const number = 12;
  // adicona resultado da busca conforme condições de area filtradas
  const renderAreaCactegory = useCallback(async () => {
    if (searchArea === 'All') {
      const allArea = await getApiByAllFoods();
      setFilterArea(allArea);
    } else {
      const local = await getFoodFilterArea(searchArea);
      setFilterArea(local);
    }
  }, [searchArea]);
  // adiciona as area retornada da api ás opções do select
  async function getListFoodByArea() {
    const meals = await getFoodByArea();
    setArea(meals);
  }

  useEffect(() => {
    getListFoodByArea();
  }, []);

  useEffect(() => {
    renderAreaCactegory();
  }, [renderAreaCactegory]);

  return (
    <div>
      <Header pageTitle="Explorar Origem" hasSearchIcon="active" />
      <select
        onChange={ (e) => setSearchArea(e.target.value) }
        data-testid="explore-by-area-dropdown"
      >
        <option data-testid="All-option">All</option>
        {
          area.map(({ strArea }, index) => (
            <option
              key={ index }
              value={ strArea }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))
        }
      </select>
      {
        filteredArea.map(({ idMeal, strMeal, strMealThumb }, index) => (
          <Link to={ `/comidas/${idMeal}` } key={ idMeal }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ strMeal }
              />
              <h2 data-testid={ `${index}-card-name` }>{ strMeal }</h2>
            </div>
          </Link>
        )).slice(0, number)
      }
      <Footer />
    </div>
  );
}
export default ExploreFoodsArea;
