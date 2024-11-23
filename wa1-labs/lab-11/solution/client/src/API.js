import Film from "./models/Film.js";

const SERVER_URL = "http://localhost:3001/api";

// AUTH
async function login(credentials) {
  const response = await fetch(SERVER_URL + "/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    // const errDetails = await response.text();
    const errDetails = await response.json();
    throw errDetails;
  }
}

async function getUserInfo() {
  const response = await fetch(SERVER_URL + "/sessions/current", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const errDetails = await response.text();
    throw errDetails;
  }
}

async function logout() {
  const response = await fetch(SERVER_URL + "/sessions/current", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  if (!response.ok) {
    const errDetails = await response.text();
    throw errDetails;
  }
}

async function getFilms(filter) {
  const path = SERVER_URL + "/films" + (filter ? `?filter=${filter}` : "");
  const films = await fetch(path, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(handleInvalidResponse)
    .then((response) => response.json())
    .then(mapApiFilmsToFilms);

  return films;
}

async function addFilm(film) {
  return await fetch(SERVER_URL + "/films", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(film),
  }).then(handleInvalidResponse);
}

async function updateFilm(film) {
  return await fetch(SERVER_URL + "/films/" + film.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(film),
  }).then(handleInvalidResponse);
}

async function updateFilmRating(filmId, nextRating) {
  return await fetch(SERVER_URL + "/films/" + filmId + "/rating", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ rating: nextRating }),
  }).then(handleInvalidResponse);
}

async function updateFilmFavorite(filmId, nextFavorite) {
  return await fetch(SERVER_URL + "/films/" + filmId + "/favorite", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ favorite: nextFavorite }),
  }).then(handleInvalidResponse);
}

async function deleteFilm(filmId) {
  return await fetch(SERVER_URL + "/films/" + filmId, {
    method: "DELETE",
    credentials: "include",
  }).then(handleInvalidResponse);
}

function handleInvalidResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  let type = response.headers.get("Content-Type");
  if (type !== null && type.indexOf("application/json") === -1) {
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

const API = {
  getFilms,
  addFilm,
  updateFilm,
  updateFilmRating,
  updateFilmFavorite,
  deleteFilm,
  login,
  logout,
  getUserInfo,
};
export default API;
