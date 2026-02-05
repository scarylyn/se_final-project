import { baseUrl, pokeApi } from "./constants";

export const getPokemon = () => {
  return fetch(`${pokeApi}/pokemon?limit=400`, {
    headers: {
      "Content-type": "application/json",
    },
  }).then(handleServerResponse);
};

export const pokeOfTheDay = () => {
  const randomPoke = Math.floor(Math.random() * 386);
  return fetch(`${pokeApi}/pokemon/${randomPoke}`, {
    headers: {
      "Content-type": "application/json",
    },
  }).then(handleServerResponse);
};

export const filteredByType = (filterType) => {
  return fetch(`${pokeApi}/type/${filterType}/`, {
    headers: {
      "Content-type": "application/json",
    },
  }).then(handleServerResponse);
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};
