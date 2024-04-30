// OMDb API : https://www.omdbapi.com/?i=tt3896198&apikey=608550fb
// Search List - https://www.omdbapi.com/?s=${movie}&apikey=608550fb

const searchInput = document.getElementById("search-input");
const searchList = document.querySelector(".search-list");


async function loadMovie(movie) {
    const response = await fetch(`https://www.omdbapi.com/?s=${movie}&apikey=608550fb`);
    const data = await response.json();
    if (data.Response === "True") {
        displayMovieList(data.Search);
    }
}

function searchMovie() {
    let search_movie = searchInput.value.trim();
    if (search_movie.length > 0) {
        loadMovie(search_movie);
        searchList.classList.remove("hide-search-list");
    } else {
        searchList.classList.add("hide-search-list");
    }
}

function displayMovieList(movieList) {
    searchList.innerHTML = "";
    for (let i = 0; i < movieList.length; i++) {
        let search_list_item = document.createElement("div");
        search_list_item.classList.add("search-list-item");
        search_list_item.dataset.id = movieList[i].imdbID;
        let moviePoster = "";
        if(movieList[i].Poster !== "N/A"){
            moviePoster = movieList[i].Poster;
        }else{
            moviePoster = "poster-not-available.jpg"
        }
        search_list_item.innerHTML = `
        <div class="search-list-thumbnail">
            <img class="movie-poster-thumbnail" src="${moviePoster}" alt="">
        </div>
        <div class="search-list-info">
            <p class="search-list-title">${movieList[i].Title}</p>
            <div class="search-list-sub-info">
                <small class="search-list-release">${movieList[i].Year}</small>
                <small class="search-list-type">${movieList[i].Type}</small>
            </div>
        </div>
        `
        searchList.appendChild(search_list_item);
        detailMovie();
    }
}

const movieDetailContainer = document.querySelector('.movie-detail-container');
// const movieTitle = document.querySelector('.movie-title');
// const released = document.querySelector('.released');
// const runTime = document.querySelector('.time');
// const rating = document.querySelector('.rating');
// const genre = document.querySelector('.genre');
// const plotText = document.querySelector('.plot-text');
// const posterImg = document.querySelector('.poster-img');
// const detailDescription = document.querySelector('.detail-description');

function detailMovie(){
    const searchListMovie = document.querySelectorAll('.search-list-item');
    searchListMovie.forEach(movie => {
        movie.addEventListener('click', async () => {
            searchList.classList.add("hide-search-list");
            const response = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=608550fb`)
            const data = await response.json();
            movieDetailContainer.innerHTML = `
            <div class="detail-movie-img">
                <img class="poster-img" src="${data.Poster}" alt="">
            </div>
            <div class="detail-movie-info">
                <h1 class="movie-title">${data.Title}</h1>
                <div class="movie-releaseTimeRating">
                    <p class="released">Released: ${data.Year}</p>
                    <p class="time">${data.Runtime}</p>
                    <p class="rating">IMDb: ${data.imdbRating}</p>
                    <p class="hd">HD</p>
                </div>
                <div class="genre">${data.Genre}</div>
                <div class="plot">
                    <small>Overview:</small>
                    <p class="plot-text">${data.Plot}</p>
                </div>
                <div class="detail-description">
                    <p><span>Cast: </span>${data.Actors}</p>
                    <p><span>Writer: </span>${data.Writer}</p>
                    <p><span>Director: </span>${data.Director}</p>
                    <p class="lang"><span>Language: </span>${data.Language}</p>
                </div>
            </div>
            `;
            searchInput.value = "";
        })
    });
}
