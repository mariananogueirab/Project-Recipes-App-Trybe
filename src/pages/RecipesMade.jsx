import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function RecipesMade() {
  return (
    <div>
      <Header pageTitle="Receitas Feitas" hasSearchIcon={ false } />
      <Footer />
    </div>
  );
}

export default RecipesMade;
