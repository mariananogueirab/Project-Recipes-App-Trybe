import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getFoodByArea } from '../services/FetchApiAll';

function ExploreFoodsArea() {
  const [area, setArea] = useState([]);

  useEffect(() => {
    async function getListFoodByArea() {
      const meals = await getFoodByArea();
      setArea(meals);
    }
    getListFoodByArea();
  }, []);

  return (
    <div>
      <Header pageTitle="Explorar Origem" hasSearchIcon="active" />
      <select
        data-testid="explore-by-area-dropdown"
      >
        {
          area.map(({ strArea }, index) => (
            <option key={ index } data-testid={ `${strArea}-option` }>{ strArea }</option>
          ))
        }
      </select>
      <Footer />
    </div>
  );
}
export default ExploreFoodsArea;
