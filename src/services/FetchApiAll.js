const API_BY_ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_BY_ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export const getApiByAllDrinks = () => (
  fetch(API_BY_ALL_DRINKS)
    .then((response) => (
      response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);

export const getApiByAllFoods = () => (
  fetch(API_BY_ALL_FOODS)
    .then((resp) => (
      resp
        .json()
        .then((data) => (resp.ok ? Promise.resolve(data) : Promise.reject(data)))
    ))
);
