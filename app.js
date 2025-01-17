const form = document.getElementById("form");
const cards = document.getElementById("cards");
const noSearchFound = document.getElementById("no-search-found");

let movieArray = [];
let movieIdDetails = [];

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
    console.log(movieArray);
    renderMovies();
    input.value = "";
    // input.value = "sorry it is taking ages to load";
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

    htmlStr += ` <section class="container card" id="card"> <img src=${data.Poster} alt="poster of ${movie.Title}" class="poster" />
        <div class="movie-content">
          <div class="movie-title-container">
            <h2>${data.Title}</h2>
            <img src="images/StarIcon.png" alt="star icon" class="star-icon" />
            <p class="rating">${data.imdbRating}</p>
          </div>
          <div class="small-line">
            <p>${data.Runtime}</p>
            <p>${data.Genre}</p>

            <button class="add-btn" id=${data.imdbID}  onclick="handleAddBtn()">
              <img src="images/AddIcon.png" alt="add icon"  />
              <p>Watchlist</p>
            </button>
          </div>
          <p class="movie-desc">
            ${data.Plot}
          </p>
        </div> </section>`;
  }
  cards.innerHTML = htmlStr;
}

function handleAddBtn() {
  console.log("you clicked add btn");
}
//I must filter through the movies array and if the movieID that we are looping thru === the movieID of the btn we click on we must setItem to localStorage and name a key value pair
//and we will getItem on the watchlist page

//!   ---------- OTHER FUNCTIONS ----------

//"http://www.omdbapi.com/?i=tt1630029&apikey=1e2e1a57"
