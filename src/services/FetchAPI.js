const API_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const API_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const API_BY_FIRST_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export function getApiByIngrediente(ingredient) {
  return fetch(`${API_BY_INGREDIENT}${ingredient}`)
    .then((resp) => (
      resp
        .json()
        .then((data) => (resp.ok ? Promise.resolve(data) : Promise.reject(data)))
    ));
}

export function getApiByName(nome) {
  return fetch(`${API_BY_NAME}${nome}`)
    .then((respon) => (
      respon
        .json()
        .then((data) => (respon.ok ? Promise.resolve(data) : Promise.reject(data)))
    ));
}

export function getApiByFirstLetter(firstLetter) {
  return fetch(`${API_BY_FIRST_LETTER}${firstLetter}`)
    .then((response) => (
      response
        .json()
        .then((data) => (response.ok ? Promise.resolve(data) : Promise.reject(data)))
    ));
}
