import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../styles/recommendationCard.css';

function RecommendationCard({ recommendations }) {
  const type = useHistory().location.pathname.includes('comida') ? 'Drink' : 'Meal'; // isso é pra pegar parte da rota, pra ver se é de comida ou bebida. Pra fazer um componente só, dinâmico, pros dois.
  const NUM_OF_RECOMMENDATIONS = 6;
  const recipesRecom = recommendations.splice(0, NUM_OF_RECOMMENDATIONS);

  function renderCard() {
    return recipesRecom.map((recommendation, index) => (
      <div key={ index } className="card" data-testid={ `${index}-recomendation-card` }>
        <img
          src={ recommendation[`str${type}Thumb`] }
          alt={ recommendation[`str${type}`] }
        />

        <h1
          data-testid={ `${index}-recomendation-title` }
        >
          {recommendation[`str${type}`]}
        </h1>

      </div>
    ));
  }

  return (
    <div
      /* iemsToShow={ 3 }
      itemsToScroll={ 3 }
      pause="hover"temsToShow={ 3 }
      itemsToScroll={ 3 }
      pause="hover" */
      className="container"
      /* data-testid="recomendation-card" */
    >
      {renderCard()}
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default RecommendationCard;
