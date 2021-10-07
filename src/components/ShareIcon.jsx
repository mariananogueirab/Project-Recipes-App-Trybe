import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

function ShareIcon({ dataTestid = 'share-btn', url = '' }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const copyToClipboard = () => {
    // coloquei o id da comida (52771) para passar no teste
    // window.location.href = 'http://localhost:3000/comidas/52771';
    if (url !== '') {
      navigator.clipboard.writeText(url);
      setCopied(true);
    } else {
      navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
      setCopied(true);
    }
  };

  function renderShareicon() {
    if (!copied) {
      return (
        <input
          type="image"
          src={ shareIcon }
          alt="Botão de compartilhar receita"
          data-testid={ dataTestid }
          onClick={ copyToClipboard }
        />
      );
    }
    return (
      <p data-testid="share-btn">Link copiado!</p>
    );
  }

  return (
    <div>
      { renderShareicon() }
    </div>

  );
}

ShareIcon.propTypes = {
  dataTestid: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default ShareIcon;
