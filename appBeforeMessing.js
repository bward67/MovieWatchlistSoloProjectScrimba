const addBtn = document.getElementById("add-btn");
const form = document.getElementById("form");
const cards = document.getElementById("cards");

let movieArray = [];
let movieIdDetails = [];
let movieRatings = "";
let runTime = "";
let genre = "";
let plot = "";

//!   ---------- EVENT LISTENERS ----------

document.addEventListener("click", function (e) {
  if (e.target.id === "add-btn") {
    console.log("you got the add btn");
    //create a new array myWatchlistArray and push this card into the new array - then we can access its imdbID to delete it on my Watchlist.html page
  }
});

// addBtn.addEventListener("click", function () {
//   console.log("does this add btn work?");
// });

form.addEventListener("submit", function (e) {
  e.preventDefault();
  handleSearch();
});

//!   ---------- FUNCTIONS FOR EVENT LISTENERS ----------
function handleSearch() {
  const input = document.getElementById("search");
  const inputValue = input.value;
  console.log(inputValue);

  //then we must set local storage
  //and when watchlist.html loads we must get from local storage

  async function getData() {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=77c31f07&s=${inputValue}`
    );
    const data = await res.json();
    console.log(data.Search[0]); // this works

    movieArray.push(data.Search[0]);
    console.log(movieArray);
    console.log(movieArray[0].imdbID); // this works

    movieArray.forEach((movie) => {
      console.log(movie);

      async function getIdDetails() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=77c31f07&i=${movie.imdbID}`
        );
        const movieDetails = await res.json();
        console.log(movieDetails);
        movieIdDetails.push(movieDetails);
        console.log(movieIdDetails);
        movieRatings = movieIdDetails[0].Ratings;
        console.log(movieRatings);

        runTime = movieIdDetails[0].Runtime;
        console.log(runTime);
        genre = movieIdDetails[0].Genre;
        console.log(genre);
        plot = movieIdDetails[0].Plot;
        console.log(plot);
      }
      getIdDetails();
    });

    renderMovies();
  }

  getData();
  input.value = "";
}

//!   ---------- OTHER FUNCTIONS ----------
function renderMovies() {
  let htmlStr = "";
  console.log(plot); //this does not work
  console.log(movieIdDetails[0].Plot); //this does not work
  htmlStr = movieArray.map(
    (
      movie
    ) => ` <section class="container card" id="card"> <img src=${movie.Poster} alt="poster of ${movie.Title}" class="poster" />
        <div class="movie-content">
          <div class="movie-title-container">
            <h2>${movie.Title}</h2>
            <img src="images/StarIcon.png" alt="star icon" class="star-icon" />
            <p class="rating">${movieRatings}</p>
          </div>
          <div class="small-line">
            <p>${runTime}</p>
            <p>${genre}</p>

            <button class="add-btn" id="add-btn">
              <img src="images/AddIcon.png" alt="add icon" />
              <p>Watchlist</p>
            </button>
          </div>
          <p class="movie-desc">
            ${movieIdDetails[0].Plot}
          </p>
        </div> </section>`
  );
  cards.innerHTML = htmlStr;
}

//"http://www.omdbapi.com/?i=tt1630029&apikey=1e2e1a57"
