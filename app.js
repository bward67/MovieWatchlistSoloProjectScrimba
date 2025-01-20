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

//! MAYBE THIS WILL FIX MY PROBLEM?????  BUT WHERE CAN I PUT IT?
// movieObject = JSON.parse(localStorage.getItem("myWatchlistMovies"));
// filteredArray = [...movieObject];
// console.log({ movieObject, filteredArray });

function handleAddBtn(id) {
  //console.log(id.id);
  console.log(movieIdDetails);
  console.log(filteredArray);

  movieIdDetails.filter((movie) => {
    //so that if the user clicks the add btn twice for 1 movie we don't get duplicates
    // and I want the last movie the user clicks on to appear at the top
    if (!filteredArray.includes(movie)) {
      if (movie.imdbID === id.id) {
        filteredArray.unshift(movie);
        //console.log(filteredArray);

        localStorage.setItem(
          "myWatchlistMovies",
          JSON.stringify(filteredArray)
        );
      }
    }
  });
  console.log(filteredArray);
}

//? ISSUES TO BE FIXED...
//! if a user goes from My watchlist back to search - searches for something and adds it to my watchlist it doesn't retain any of the past movies they saved - it's like it starts a new filteredArray - and yet I set the array with localStorage
//? yet if the user just moves from my watchlist to the search page WITHOUT searching a new movie and adding it to the my watchlist it retains the saved/added movies so you would think it has to do with the user inputting in the input field
//! BUT if the user searches for something that is not found they get the: search not found message... and if they go back to my watchlist it HAS retained the past saved/added movies
//? which means it is not removing the saved movies when the user types into the input field or else it would remove them even when we search for something which is not found
//? SO MAYBE IT HAS TO DO WITH THE ADD BTN FUNCTION
//! it's a head scratcher.. for MY tiny little brain anyhow :)
