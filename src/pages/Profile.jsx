import React from 'react';
import PropTypes from 'prop-types';

function Profile({ history }) {
  function getLocalStorage(key) {
    if (localStorage.key(key)) {
      return localStorage.getItem(key);
    }
  }

  return (
    <main>
      <h2 data-testid="profile-email">
        {getLocalStorage('email')}
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
    </main>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
