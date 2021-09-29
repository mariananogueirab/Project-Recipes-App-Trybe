import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Footer.css';

function Footer() {
  return (
    <div>
      <footer
        data-testid="footer"
        className="Footer"
      >
        <Link to="/bebidas">
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="icon drink"
          />
        </Link>

        <Link to="/explorar">
          <img
            data-testid="explore-bottom-btn"
            src={ exploreIcon }
            alt="icon explore"
          />
        </Link>

        <Link to="/comidas">
          <img
            data-testid="food-bottom-btn"
            src={ mealIcon }
            alt="icon meal"
          />
        </Link>
      </footer>
    </div>
  );
}

export default Footer;
