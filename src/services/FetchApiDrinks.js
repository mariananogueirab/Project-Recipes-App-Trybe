const API_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const API_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_BY_FIRST_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

async function getApiByIngrediente(ingredient, callback) {
  try {
    const results = await fetch(`${API_BY_INGREDIENT}${ingredient}`)
      .then((res) => res.json());
    callback(results.drinks);
  } catch (error) {
    console.error(error);
  }
}

async function getApiByName(nome, callback) {
  try {
    const results = await fetch(`${API_BY_NAME}${nome}`).then((res) => res.json());
    callback(results.drinks);
  } catch (error) {
    console.error(error);
  }
}

async function getApiByFirstLetter(firstLetter, callback) {
  try {
    const results = await fetch(`${API_BY_FIRST_LETTER}${firstLetter}`)
      .then((res) => res.json());
    callback(results.drinks);
  } catch (error) {
    console.error(error);
  }
}

function FetchApiDrinks(searchText, searchRadio, setSearchRecipes) {
  switch (searchRadio) {
  case 'ingredient':
    getApiByIngrediente(searchText, setSearchRecipes);
    break;
  case 'name':
    getApiByName(searchText, setSearchRecipes);
    break;
  case 'first-letter':
    if (searchText.length === 1) {
      getApiByFirstLetter(searchText, setSearchRecipes);
    } else {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
    break;
  default:
    break;
  }
}

export default FetchApiDrinks;
