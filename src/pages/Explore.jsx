import React from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();
  return (
    <div>
      <Header pageTitle="Explorar" hasSearchIcon={ false } />
      <button
        data-testid="explore-food"
        type="button"
        onClick={ () => history.push('/explorar/comidas') }
      >
        Explorar Comidas
      </button>
      <button
        data-testid="explore-drinks"
        type="button"
        onClick={ () => history.push('/explorar/bebidas') }
      >
        Explorar Bebidas
      </button>
      <Footer />
    </div>
  );
}
export default Explore;
