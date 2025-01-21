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

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=77c31f07&s=${inputValue}`
  );
  const data = await res.json();
  // console.log(data.Response); // this works
  if (data.Response === "True") {
    movieArray = data.Search;
    //console.log(movieArray);

    input.value = "Please wait while we search ...";
    //! I must make this input.value msg stop when the fetch comes in - I tried it using try, catch & finally but could not get it to work - but I will eventually :)
    noSearchFound.style.display = "none";
    renderMovies();
    setTimeout(function () {
      input.value = "";
    }, 10000);
    // noSearchFound.style.display = "none";  this is not necessary?
  } else {
    // I must remove any movies that may be displayed here however I want them to remain in the moviesArray
    // cards.innerHTML = "";
    noSearchFound.style.display = "block";
    input.value = "";
  }
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

    htmlStr += ` <div class="container card" id="card"> <img src=${data.Poster} alt="poster of ${data.Title}" class="poster" />
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

function handleAddBtn(btn) {
  //console.log(id.id);
  //console.log(movieIdDetails);
  // console.log(filteredArray);
  //! so my problems were all about checking if there are previous movies in the filteredArray/my watchlist
  //so we must getItem from localStorage if there is any movies there or if not just get an empty array []
  const previousMovies = JSON.parse(
    localStorage.getItem("myWatchlistMovies") || []
  );
  filteredArray = previousMovies;

  //use .map instead of .filter
  movieIdDetails.map((movie) => {
    //so that if the user clicks the add btn twice for 1 movie we don't get duplicates BUT FIRST WE MUST CHECK IF THE MOVIE EXISTS IN MY WATCHLIST
    const existInWatchlist = filteredArray.find(
      (movie) => movie?.imdbID === btn.id
    );
    console.log(existInWatchlist);

    //? The ?. is the optional chaining operator, which ensures that if movie is null or undefined, the code won't throw an error, and it will just return undefined instead of trying to access imdbID on a null or undefined value.

    //if it does exist in my watchlist remove it from the filteredArray
    if (existInWatchlist) {
      filteredArray = filteredArray.filter((movie) => movie?.imdbID !== btn.id);
    }

    //then add the movie
    // and I want the last movie the user clicks on to appear at the top
    if (movie.imdbID === btn.id) {
      filteredArray.unshift(movie);
      //console.log(filteredArray);

      localStorage.setItem("myWatchlistMovies", JSON.stringify(filteredArray));
    }
  });
  //console.log(filteredArray);
}
