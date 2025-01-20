const form = document.getElementById("form");
const cards = document.getElementById("cards");
const noSearchFound = document.getElementById("no-search-found");

let movieArray = [];
let movieIdDetails = [];
let filteredArray = [];

//!   ---------- EVENT LISTENERS ----------

form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleSearch();
});

//!   ---------- FUNCTIONS FOR EVENT LISTENERS ----------
async function handleSearch() {
  const input = document.getElementById("search");
  const inputValue = input.value;
  //console.log(inputValue);
  try {
    input.value = "We are searching for you...";
    // noSearchFound.innerHTML = "We are Searching for you...";

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=77c31f07&s=${inputValue}`
    );
    const data = await res.json();
    // console.log(data.Response); // this works
    if (data.Response === "True") {
      movieArray = data.Search;
      //console.log(movieArray);
      renderMovies();
    } else {
      noSearchFound.style.display = "block";
      input.value = "";
    }
  } catch (error) {
    console.log("error");
  } finally {
    input.value = "";
    noSearchFound.style.display = "none";
    // noSearchFound.innerHTML = "";
  }
  // handleSearch();
}

async function renderMovies() {
  let htmlStr = "";
  for (let movie of movieArray) {
    const res = await fetch(
      `https://www.omdbapi.com/?apikey=77c31f07&i=${movie.imdbID}`
    );
    const data = await res.json();

    movieIdDetails.push(data);
    //console.log(movieIdDetails);

    htmlStr += ` <div class="container card" id="card"> <img src=${data.Poster} alt="poster of ${movie.Title}" class="poster" />
        <div class="movie-content">
          <div class="movie-title-container">
            <h2>${data.Title}</h2>
            <img src="images/StarIcon.png" alt="star icon" class="star-icon" />
            <p class="rating">${data.imdbRating}</p>
          </div>
          <div class="small-line">
            <p>${data.Runtime}</p>
            <p>${data.Genre}</p>

            <button class="add-btn" id=${data.imdbID}  onclick="handleAddBtn(${data.imdbID})">
              <img src="images/AddIcon.png" alt="add icon"  />
              <p>Watchlist</p>
            </button>
          </div>
          <p class="movie-desc">
            ${data.Plot}
          </p>
        </div> </div>`;
  }
  cards.innerHTML = htmlStr;
}

function handleAddBtn(id) {
  //console.log(id.id);
  //console.log(movieIdDetails);

  movieIdDetails.filter((movie) => {
    //so that if the user clicks the add btn twice for 1 movie we don't get duplicates
    // and I want the last movie the user clicks on to appear at the top
    if (!filteredArray.includes(movie)) {
      if (movie.imdbID === id.id) {
        filteredArray.unshift(movie);
        localStorage.setItem(
          "myWatchlistMovies",
          JSON.stringify(filteredArray)
        );
      }
    }
  });
}

//! BIG PROBLEM: if a user goes from My watchlist back to search - searches for something and adds it to my watchlist it doesn't retain any of the past movies they saved - it's like it starts a new moviesArray
//? yet if the user just moves from my watchlist to the search page WITHOUT searching a new movie and adding it to the my watchlist it retains the saved/added movies
//! and yet if the user searches for something that is not found they get the: search not found message and if they go back to my watchlist it HAS retained the past saved/added movies
//? which means it is not removing the saved movies when the user types into the input field or else it would remove them even when we search for something which is not found
//! it's a head scratcher
//? and sometimes when I go back to My watchlist and there is a movie saved there the message about you have nothing shows up under the movie that has been saved
