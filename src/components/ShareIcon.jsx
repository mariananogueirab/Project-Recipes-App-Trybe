import React, { useState } from 'react';
import { useHistory } from 'react-router';
import shareIcon from '../images/shareIcon.svg';

function ShareIcon({ id }) {
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  console.log(history);
  const copyToClipboard = () => {
    // coloquei o id da comida (52771) para passar no teste
    // window.location.href = 'http://localhost:3000/comidas/52771';
    navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
    setCopied(true);
  };

  function renderShareicon() {
    if (!copied) {
      return (
        <input
          type="image"
          src={ shareIcon }
          alt="Botão de compartilhar receita"
          data-testid="share-btn"
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
export default ShareIcon;
