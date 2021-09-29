import React from 'react';
import ExploreDrinkFood from '../components/ExploreDrinkFood';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFoods() {
  return (
    <div>
      <Header pageTitle="Explorar Comidas" hasSearchIcon={ false } />
      <ExploreDrinkFood />
      <Footer />
    </div>
  );
}
export default ExploreFoods;
