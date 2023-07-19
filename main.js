// API URL constants
//const API_KEY = e34531e9e4f0b5df5eda2c7b50a32d27
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e34531e9e4f0b5df5eda2c7b50a32d27&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=e34531e9e4f0b5df5eda2c7b50a32d27&query="';

// References to DOM elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const movieContainer = document.getElementById('movie-container');

// Fetch movies from API
async function getMovies(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.log('Error:', error);
    // Handle error gracefully, show error message to the user, etc.
  }
}

// Display movies in the UI
function showMovies(movies) {
  movieContainer.innerHTML = '';

  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    movieElement.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="rating">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview:</h3>
        ${overview}
      </div>
    `;

    movieContainer.appendChild(movieElement);
  });
}

// Handle form submission
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm)
      .then((movies) => showMovies(movies))
      .catch((error) => console.log('Error:', error));
    searchInput.value = '';
  } else {
    // Handle empty search term
  }
});

// Initial page load: Fetch and display popular movies
getMovies(API_URL)
  .then((movies) => showMovies(movies))
  .catch((error) => console.log('Error:', error));