import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoritesRecipes() {
  const [recipes, setRecipes] = useState({ meals: [], drinks: [] });
  const [recipesFiltered, setRecipesFiltered] = useState([]);
  const [copied, setCopied] = useState(false);

  // copia a url local para área de transferencia através do clipboard
  const copyToClipboard = ({ target: { id } }) => {
    navigator.clipboard.writeText(`${window.location.origin}/${id}`);
    setCopied(true);
  };
  // insere as receitas resgatadas do localstorage no stado local conforme chave específicas de comidas e bebidas
  const allocateRecipes = (recipesLocal) => {
    setRecipes((prevState) => ({
      ...prevState, meals: recipesLocal.filter(({ type }) => type === 'comida') }));
    setRecipes((prevState) => ({
      ...prevState, drinks: recipesLocal.filter(({ type }) => type === 'bebida') }));
    setRecipesFiltered(recipesLocal);
  };
  // remove receita pelo id do localstorage e do estado local
  const favoriteRemove = ({ target: { id } }) => {
    const recipesLocal = JSON.parse(localStorage.getItem('favoriteRecipes'));
    localStorage.setItem('favoriteRecipes',
      JSON.stringify(recipesLocal.filter((rec) => rec.id !== id)));
    const getRecipesLocal = localStorage.getItem('favoriteRecipes');
    if (getRecipesLocal) {
      allocateRecipes(JSON.parse(getRecipesLocal));
    }
  };
  // renderiza as receitas conforme as opções dos botões
  const renderRecipes = ({ target: { innerText } }) => {
    if (innerText === 'All') {
      setRecipesFiltered([...recipes.meals, ...recipes.drinks]);
    } else if (innerText === 'Food') {
      setRecipesFiltered([...recipes.meals]);
    } else {
      setRecipesFiltered([...recipes.drinks]);
    }
  };

  useEffect(() => {
    const recipesLocal = localStorage.getItem('favoriteRecipes');
    if (recipesLocal) {
      allocateRecipes(JSON.parse(recipesLocal));
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Receitas Favoritas" hasSearchIcon={ false } />
      <Button onClick={ renderRecipes } label="All" testid="filter-by-all-btn" />
      <Button onClick={ renderRecipes } label="Food" testid="filter-by-food-btn" />
      <Button onClick={ renderRecipes } label="Drinks" testid="filter-by-drink-btn" />
      {
        recipesFiltered.map((
          { id, area, category, name, image, alcoholicOrNot, type }, index,
        ) => (
          <div key={ id } data-testid={ `${index}-${name}-horizontal-tag` }>
            <Link to={ `/${type}s/${id}` }>
              <img
                width="300px"
                data-testid={ `${index}-horizontal-image` }
                src={ image }
                alt={ name }
              />
              <h2 data-testid={ `${index}-horizontal-name` }>{ name }</h2>
            </Link>
            <div data-testid={ `${index}-horizontal-top-text` }>
              <p>{ `${area} - ${category}` }</p>
              <p>{ alcoholicOrNot }</p>
            </div>
            <button
              id={ `${type}s/${id}` }
              type="button"
              style={ { border: 'none' } }
              onClick={ copyToClipboard }
            >
              <img
                id={ `${type}s/${id}` }
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt={ type }
              />
              { copied && 'Link copiado!' }
            </button>
            <input
              id={ id }
              type="image"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ favoriteRemove }
              src={ blackHeartIcon }
              alt="favoritar receita"
            />
          </div>
        ))
      }
    </div>
  );
}

export default FavoritesRecipes;
