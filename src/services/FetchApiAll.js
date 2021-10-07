const API_BY_ALL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_BY_ALL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_DRINK_BY_ID = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const API_FOODS_RECOMENDATION = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const API_DRINKS_RECOMENDATION = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const API_DRINK_RANDOM = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
const API_FOOD_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';
const API_FOOD_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const API_DRINK_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const API_FOOD_INGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
const API_DRINK_INGREDIENTS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
const API_FOOD_AREA = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
const API_FOOD_FILTER_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
const API_FILTER_FOOD = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
const API_FILTER_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export const getApiByAllDrinks = async () => {
  const { drinks } = await fetch(API_BY_ALL_DRINKS)
    .then((res) => res.json());
  return drinks;
};

export const getApiByAllFoods = async () => {
  const { meals } = await fetch(API_BY_ALL_FOODS)
    .then((res) => res.json());
  return meals;
};

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

export const getDrinkRandom = async () => {
  const { drinks } = await fetch(API_DRINK_RANDOM)
    .then((res) => res.json());
  return drinks;
};

export const getFoodRandom = async () => {
  const { meals } = await fetch(API_FOOD_RANDOM)
    .then((res) => res.json());
  return meals;
};

export const getFoodCategories = async () => {
  const { meals } = await fetch(API_FOOD_CATEGORIES)
    .then((res) => res.json());
  return meals;
};

export const getDrinkCategories = async () => {
  const { drinks } = await fetch(API_DRINK_CATEGORIES)
    .then((res) => res.json());
  return drinks;
};

export const getFoodByIndredients = async () => {
  const { meals } = await fetch(API_FOOD_INGREDIENTS)
    .then((res) => res.json());
  return meals;
};

export const getDrinkByIndredients = async () => {
  const { drinks } = await fetch(API_DRINK_INGREDIENTS)
    .then((res) => res.json());
  return drinks;
};

export const getFoodByArea = async () => {
  const { meals } = await fetch(API_FOOD_AREA)
    .then((res) => res.json());
  return meals;
};

export const getFoodFilterArea = async (area) => {
  const { meals } = await fetch(`${API_FOOD_FILTER_AREA}${area}`)
    .then((res) => res.json());
  return meals;
};

export const RecipesFilterFood = async (nameCategory) => {
  const { meals } = await fetch(`${API_FILTER_FOOD}${nameCategory}`)
    .then((res) => res.json());
  return meals;
};

export const RecipesFilterDrink = async (nameCategory) => {
  try {
    const results = await fetch(`${API_FILTER_DRINK}${nameCategory}`);
    const { drinks } = await results.json();
    return drinks;
  } catch (error) {
    console.error(error);
  }
};
