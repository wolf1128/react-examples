// console.log("JS file has been loaded!")

// import dayjs from "dayjs"; NOTE: This is for server side. Here we used the CDN version instead.

(async () => {


let selectedFilter = "All";



function Film(id, title, isFavorite = false, watchDate = null, rating = 0, userId = 1) {
  this.id = id;
  this.title = title;
  this.favorite = isFavorite;
  this.rating = rating;
  // saved as dayjs object only if watchDate is truthy
  this.watchDate = watchDate && dayjs(watchDate);
  this.userId = userId

  this.toString = () => {
    return `Id: ${this.id}, ` +
    `Title: ${this.title}, Favorite: ${this.favorite}, ` +
    `Watch date: ${this.watchDate}, Score: ${this.rating}, ` +
    `User: ${this.userId}` ;
  }
}

function FilmLibrary() {
  this.list = [];

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicated id');
  };

}


function initializeLibraryData() {

  return new Promise((resolve, reject) => {
    // Creating some film entries
    const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
    const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
    const starWars = new Film(3, "Star Wars", false);
    const matrix = new Film(4, "Matrix");
    const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);
  
    // Adding the films to the FilmLibrary
    const library = new FilmLibrary();
    library.addNewFilm(pulpFiction);
    library.addNewFilm(grams21);
    library.addNewFilm(starWars);
    library.addNewFilm(matrix);
    library.addNewFilm(shrek);

    if (library) {
      resolve(library);
    } else {
      reject("Error: Library could not be initialized");
    }
  });
}

function filterFilmList(library, selectedFilter) {
  const copiedLibraryList = [...library.list];
  const filteredLibrary = copiedLibraryList.filter(film => {
    if(selectedFilter === "All") return true;
    if(selectedFilter === "Favorite") return film.favorite;
    if(selectedFilter === "Best Rated") return film.rating >= 5;
    if(selectedFilter === "Seen Last Month") return film => isSeenLastMonth(film);
    if(selectedFilter === "Unseen") return !film.watchDate;
  })

  return filteredLibrary
}

function renderFilmList(filmList) {
  const filmsList = document.getElementById("films-list");
  filmsList.innerHTML = "";

  filmList.forEach((film) => {
    const filmListGroupItem = document.createElement("li");
    filmListGroupItem.classList.add("list-group-item");
    filmListGroupItem.innerHTML = ` 
      <li class="list-group-item">
        <div class="row gy-2">
            <div class="col-6 col-xl-3 favorite-title d-flex gap-2 align-items-center">
                ${film.title}
                <div class="d-xl-none actions">
                    <i class="bi bi-pencil"></i>
                    <i class="bi bi-trash"></i>
                </div>
            </div>
            <div class="col-6 col-xl-3 text-end text-xl-center">
            <span class="custom-control custom-checkbox">
              <input type="checkbox" class="custom-control-input" id="films[1][favorite]" ${!!film.favorite  ? 'checked' : null}>
              <label class="custom-control-label" for="films[1][favorite]">Favorite</label>
            </span>
            </div>
            <div class="col-4 col-xl-3 text-xl-center">
                ${film.watchDate || "<span class=\"font-weight-bold text-warning\">Not watched yet!</span>"}
            </div>
            <div class="actions-container col-8 col-xl-3 text-end">
                <div class="rating">
                    ${Array(film.rating).fill('<i class="bi bi-star-fill"></i>').join('')}
                    ${Array(5 - film.rating).fill('<i class="bi bi-star"></i>').join('')}
                </div>
                <div class="d-none d-xl-flex actions">
                    <i class="bi bi-pencil"></i>
                    <i class="bi bi-trash"></i>
                </div>
            </div>
        </div>
      </li>
    `
    filmsList.appendChild(filmListGroupItem);
  });

  document.appendChild(filmList);
}

function initializeFilterEvents() {
  document.getElementById("all-filter").addEventListener("click", async () => {
    document.querySelectorAll(".nav-link").forEach(node => {
      node.classList.remove("active");
      node.classList.add("link-dark");
    });
    let selectedFilterItem = document.getElementById("all-filter");
    selectedFilterItem.classList.add("active");
    selectedFilterItem.classList.remove("link-dark");

    selectedFilter = "All";
    updateFilterTitle(selectedFilter)
    await main();
  });
  document.getElementById("fav-filter").addEventListener("click", async () => {
    document.querySelectorAll(".nav-link").forEach(node => {
      node.classList.remove("active");
      node.classList.add("link-dark");
    });
    let selectedFilterItem = document.getElementById("fav-filter");
    selectedFilterItem.classList.add("active");
    selectedFilterItem.classList.remove("link-dark");

    selectedFilter = "Favorite";
    updateFilterTitle(selectedFilter)
    await main();
  });
  document.getElementById("br-filter").addEventListener("click", async () => {
    document.querySelectorAll(".nav-link").forEach(node => {
      node.classList.remove("active");
      node.classList.add("link-dark");
    });
    let selectedFilterItem = document.getElementById("br-filter");
    selectedFilterItem.classList.add("active");
    selectedFilterItem.classList.remove("link-dark");

    selectedFilter = "Best Rated";
    updateFilterTitle(selectedFilter)
    await main();
  });
  document.getElementById("slm-filter").addEventListener("click", async () => {
    document.querySelectorAll(".nav-link").forEach(node => {
      node.classList.remove("active");
      node.classList.add("link-dark");
    });
    let selectedFilterItem = document.getElementById("slm-filter");
    selectedFilterItem.classList.add("active");
    selectedFilterItem.classList.remove("link-dark");

    selectedFilter = "Seen Last Month";
    updateFilterTitle(selectedFilter)
    await main();
  });
  document.getElementById("unseen-filter").addEventListener("click", async () => {
    document.querySelectorAll(".nav-link").forEach(node => {
      node.classList.remove("active");
      node.classList.add("link-dark");
    });
    let selectedFilterItem = document.getElementById("unseen-filter");
    selectedFilterItem.classList.add("active");
    selectedFilterItem.classList.remove("link-dark");

    selectedFilter = "Unseen";
    updateFilterTitle(selectedFilter)
    await main();
  });
}

function updateFilterTitle(title) {
  document.getElementById("filter-title").innerText = title;
}

const isSeenLastMonth = (film) => {
  if ('watchDate' in film && film.watchDate) {  // Accessing watchDate only if defined
      const diff = film.watchDate.diff(dayjs(), 'month');
      const isLastMonth = diff <= 0 && diff > -1;      // last month
      return isLastMonth;
  }
};

async function main() {
  const library = await initializeLibraryData();
  initializeFilterEvents();
  const filteredLibrary = filterFilmList(library, selectedFilter);
  renderFilmList(filteredLibrary);
}

await main();

})();
