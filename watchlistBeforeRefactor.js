const watchlistCard = document.getElementById("watchlist-card");
const addSearchFound = document.getElementById("add-search-found");
const addSearchBtn = document.getElementById("add-icon-search");

let moviesArray = [];

//!  ------------  EVENT LISTENERS  ------------
document.addEventListener("DOMContentLoaded", function () {
  //   console.log(moviesArray);
  renderMyWatchlist();
  //console.log(moviesArray);
  renderOrNot();
});

addSearchBtn.addEventListener("click", function () {
  window.location.assign("index.html");
  addSearchFound.style.display = "none";
});

//!  ------------  FUNCTIONS  ------------
function renderOrNot() {
  if (moviesArray.length > 1) {
    // console.log("show us the movies!");
    // console.log(moviesArray);
    renderMyWatchlist();
  } else {
    addSearchFound.style.display = "flex";
    //console.log("you have no movies selected");
  }
}

function renderMyWatchlist() {
  let myWatchlistHtml = "";

  movieObject = JSON.parse(localStorage.getItem("myWatchlistMovies"));
  moviesArray = [...movieObject];
  //console.log(moviesArray);

  for (let movie of moviesArray) {
    myWatchlistHtml += ` <div class="container card watchlist-card">
        <img src=${movie.Poster} alt="cover of${movie.Title}"  class="poster"/>
        <div class="movie-content">
          <div class="movie-title-container">
            <h2>${movie.Title}</h2>
            <img src="images/StarIcon.png" alt="star icon" class="star-icon" />
            <p class="rating">${movie.imdbRating}</p>
          </div>
          <div class="small-line">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>

            <button class="remove-btn" id=${movie.imdbID} onclick="handleRemove(${movie.imdbID})">
              <img src="images/removeIcon.png" alt="delete icon" />
              <p>Remove</p>
            </button>
          </div>
          <p class="movie-desc">
            ${movie.Plot}
          </p>
        </div>
      </div>`;
  }
  watchlistCard.innerHTML = myWatchlistHtml;
}

function handleRemove(id) {
  //console.log(moviesArray);

  let myWatchlistHtml = "";

  moviesArray = moviesArray.filter((movie) => movie.imdbID !== id.id);
  //console.log(moviesArray);

  if (moviesArray.length < 1) {
    localStorage.clear();
    addSearchFound.style.display = "flex";
  }

  localStorage.setItem("myWatchlistMovies", JSON.stringify(moviesArray));
  for (let movie of moviesArray) {
    myWatchlistHtml += ` <div class="container card watchlist-card">
        <img src=${movie.Poster} alt="cover of${movie.Title}"  class="poster"/>
        <div class="movie-content">
          <div class="movie-title-container">
            <h2>${movie.Title}</h2>
            <img src="images/StarIcon.png" alt="star icon" class="star-icon" />
            <p class="rating">${movie.imdbRating}</p>
          </div>
          <div class="small-line">
            <p>${movie.Runtime}</p>
            <p>${movie.Genre}</p>

            <button class="remove-btn" id=${movie.imdbID} onclick="handleRemove(${movie.imdbID})">
              <img src="images/removeIcon.png" alt="delete icon" />
              <p>Remove</p>
            </button>
          </div>
          <p class="movie-desc">
            ${movie.Plot}
          </p>
        </div>
      </div>`;
  }
  watchlistCard.innerHTML = myWatchlistHtml;
  //   console.log(id.id);
  //   console.log("You clicked Remove btn");
}

// }
