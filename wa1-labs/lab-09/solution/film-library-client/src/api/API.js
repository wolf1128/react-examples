const url = "http://localhost:3001/api";

export const fetchFilms = (filterName) => {
  return fetch(`${url}/films?filter=${filterName}`)
    .then((response) => response.json())
    .then((data) => data);
};

export const createFilm = (film) => {
  return fetch(`${url}/films`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  }).then((response) => response.json());
};

export const updateFilm = (film) => {
  return fetch(`${url}/films/${film.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(film),
  }).then((response) => response.json());
};

export const deleteFilm = (filmId) => {
  return fetch(`${url}/films/${filmId}`, {
    method: "DELETE",
  });
};
