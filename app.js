const form = document.getElementById("form");
const cards = document.getElementById("cards");

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
  //console.log(data.Search); // this works

  movieArray = data.Search;
  console.log(movieArray);
  renderMovies();
  input.value = "";
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

            <button class="add-btn" id=${data.imdbID}  onclick=${handleAddBtn}>
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

//!   ---------- OTHER FUNCTIONS ----------

function handleAddBtn() {
  console.log("you clicked add btn");
}
//"http://www.omdbapi.com/?i=tt1630029&apikey=1e2e1a57"
