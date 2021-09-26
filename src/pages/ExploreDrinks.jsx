import React from 'react';
import ExploreDrinkFood from '../components/ExploreDrinkFood';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrinks() {
  return (
    <div>
      <Header pageTitle="Explorar Bebidas" hasSearchIcon={ false } />
      <ExploreDrinkFood />
      <Footer />
    </div>
  );
}
export default ExploreDrinks;
