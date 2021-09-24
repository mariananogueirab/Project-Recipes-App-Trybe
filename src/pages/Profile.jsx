import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';

function Profile() {
  const { profile } = useContext(RecipesContext);
  const history = useHistory();
  return (
    <main>
      <Header pageTitle="Perfil" hasSearchIcon={ false } />
      <h2 data-testid="profile-email">
        { profile.user.email }
      </h2>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => {
          history.push('/receitas-feitas');
        } }
      >
        Receitas Feitas
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => {
          history.push('/receitas-favoritas');
        } }
      >
        Receitas Favoritas
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ () => {
          localStorage.clear();
          history.push('/');
        } }
      >
        Sair
      </button>
      <Footer />
    </main>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
