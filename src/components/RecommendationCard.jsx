import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import '../styles/recommendationCard.css';
import Carousel from 'react-bootstrap/Carousel';

function RecommendationCard({ recommendations }) {
  const type = useHistory().location.pathname.includes('comida') ? 'Drink' : 'Meal';
  function renderCard() {
    return recommendations.map((recommendation, index) => (
      <div key={ index } className="card">
        <img
          src={ recommendation[`str${type}Thumb`] }
          alt={ recommendation[`str${type}`] }
        />

        <h3 data-testid={ `${index}-recomendation-card` }>{recommendation[`str${type}`]}</h3>

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
      data-testid="recomendation-card"
    >
      {renderCard()}
    </div>
  );
}

RecommendationCard.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
};

export default RecommendationCard;
