const watchlistCard = document.getElementById("watchlist-card");
const addSearchFound = document.getElementById("add-search-found");
const addSearchBtn = document.getElementById("add-icon-search");

let filteredArray = [];

//!  ------------  EVENT LISTENERS  ------------
document.addEventListener("DOMContentLoaded", function () {
  //   console.log(filteredArray);
  // renderMyWatchlist();
  //console.log(filteredArray);
  renderOrNot();
});

addSearchBtn.addEventListener("click", function () {
  window.location.assign("index.html");
  addSearchFound.style.display = "none";
});

//!  ------------  FUNCTIONS  ------------
function renderOrNot() {
  // specify the default value of the movieObject to an empty array in case the localStorage is empty
  movieObject = JSON.parse(localStorage.getItem("myWatchlistMovies") || "[]");
  filteredArray = [...movieObject];
  if (filteredArray.length > 0) {
    // console.log("show us the movies!");
    // console.log(filteredArray);
    renderMyWatchlist();
  } else {
    addSearchFound.style.display = "flex";
  }
}

function renderMyWatchlist() {
  let myWatchlistHtml = "";

  //! I think this may be where the problem is as it should be an array and NOT an object which comes back from localStorage

  console.log({ filteredArray });

  for (let movie of filteredArray) {
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

function handleRemove(btn) {
  let myWatchlistHtml = "";
  //! instead of using localStorage.removeItem I will filter the filteredArray to keep all movies in the filteredArray EXCEPT the movie that the user clicked on
  filteredArray = filteredArray.filter((movie) => movie.imdbID !== btn.id);
  //console.log(filteredArray);

  if (filteredArray.length < 1) {
    localStorage.clear();
    addSearchFound.style.display = "flex";
  } else {
    // after removing the movie from the filteredArray update the localStorage with the new filteredArray
    localStorage.setItem("myWatchlistMovies", JSON.stringify(filteredArray));
  }

  for (let movie of filteredArray) {
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
