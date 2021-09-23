import React from 'react';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function FavoriteIcon() {
  return (
    <img data-testid="favorite-btn" src={ whiteHeartIcon } alt="shareIcon" />
  );
}
export default FavoriteIcon;
