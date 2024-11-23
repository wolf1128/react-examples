import Film from "./models/Film.js";

const SERVER_URL = "http://localhost:3001/api";

async function getFilms(filter) {
  const films = await fetch(
    SERVER_URL + "/films" + (filter ? `?filter=${filter}` : "")
  )
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .then(mapApiFilmsToFilms);

  return films;
}

async function addNewFilm(film) {
  const films = await fetch(SERVER_URL + "/films", {
    method: "POST",
    body: JSON.stringify(film),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleInvalidResponse);
  // .then((response) => response.json())
  // .then(mapApiFilmsToFilms);

  return films;
}

// updateFilm
// PUT http://localhost:3001/api/films/1
async function updateFilm(film) {
  const films = await fetch(SERVER_URL + "/films/" + film.id, {
    method: "PUT",
    body: JSON.stringify(film),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(handleInvalidResponse);
  // .then((response) => response.json());

  return films;
}

// Delete a film
// DELETE http://localhost:3001/api/films/:filmId
async function deleteFilm(filmId) {
  const films = await fetch(SERVER_URL + "/films/" + filmId, {
    method: "DELETE",
  });
  // .then((response) => response.json());

  return films;
}

function handleInvalidResponse(response) {
  console.log("response>>>: ", response);
  if (!response.ok) {
    throw Error(response.statusText);
  }
  let type = response.headers.get("Content-Type");
  if (type.indexOf("application/json") === -1) {
    throw new TypeError(`Expected JSON, got ${type}`);
  }
  return response;
}

function mapApiFilmsToFilms(apiFilms) {
  return apiFilms.map(
    (film) =>
      new Film(
        film.id,
        film.title,
        film.favorite,
        film.watchDate,
        film.rating,
        film.userId
      )
  );
}

const API = { getFilms, addNewFilm, updateFilm, deleteFilm };
export default API;
