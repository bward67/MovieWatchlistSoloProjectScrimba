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

  //then we must set local storage
  //and when watchlist.html loads we must get from local storage

  const res = await fetch(
    `https://www.omdbapi.com/?apikey=77c31f07&s=${inputValue}`
  );
  const data = await res.json();
  // console.log(data.Response); // this works
  if (data.Response === "True") {
    movieArray = data.Search;
    //console.log(movieArray);
    renderMovies();
    input.value = "We are searching for you...";
    //! I must make this input.value msg stop when the fetch comes in
    setTimeout(function () {
      input.value = "";
    }, 50000);
    noSearchFound.style.display = "none";
  } else {
    noSearchFound.style.display = "block";
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
  //! BIG PROBLEM - when I go into my watchlist page and then back to the search page to add more my Fav's I removes all the previous movies that I choose - WHY?? I put them into local storage so why doesn't it save them???
  //console.log(filteredArray);
}

//!   ---------- OTHER FUNCTIONS ----------

//"http://www.omdbapi.com/?i=tt1630029&apikey=1e2e1a57"
