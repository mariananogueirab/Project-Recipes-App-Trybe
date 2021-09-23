const API_BY_ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail';
const API_BY_ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood';
const API_DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const API_FOODS_RECOMENDATION = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const API_DRINKS_RECOMENDATION = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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

export const getDrinkById = async (id) => {
  const { drinks } = await fetch(`${API_DRINK_BY_ID}${id}`)
    .then((res) => res.json());
  return drinks;
};

export const getFoodsRecomendation = async () => {
  const { meals } = await fetch(API_FOODS_RECOMENDATION)
    .then((res) => res.json());
  return meals;
};

export const getFoodById = async (id) => {
  const { meals } = await fetch(`${API_FOOD_BY_ID}${id}`)
    .then((res) => res.json());
  return meals;
};

export const getDrinksRecomendation = async () => {
  const { drinks } = await fetch(API_DRINKS_RECOMENDATION)
    .then((res) => res.json());
  return drinks;
};
