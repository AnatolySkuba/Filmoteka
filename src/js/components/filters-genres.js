import { convertIdInGenre, movieGenresManipulationsMarkup } from './genres';
import { IMG_URL, STORAGE_KEY_MOVIES, STORAGE_KEY_FILTERS } from '../utils/constants';
import { onCardsSelect } from './card-modal';

const filtersWrapper = document.querySelector('.filters');
const filtersOpenBtn = document.querySelector('.filters__choose');
const filtersHideContainer = document.querySelector('.js-hide');
const filtersList = document.querySelector('.js-filters-list');
const filtersBtn = document.querySelector('.filters__filter');
let valueEl = document.getElementById('filters-values');
let moviesList = document.querySelector('.films-list');

let text = '';
let filters = [];

filtersBtn.addEventListener('click', onFilterBtnClick);

// ================ filters container listener=======================

filtersOpenBtn.addEventListener('click', () => {
  ['! choose a genre !', '! виберіть жанр !', '! wybierz gatunek !'].includes(valueEl.textContent) && (valueEl.textContent = '');
  filtersHideContainer.classList.toggle('filters__genres-hidden');
});

// ================ checkbox listener=================

function onCheckboxClick() {
  const indexLang = ['en', 'ua', 'pl'].indexOf(localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en');
  const texts = ["You've chosen: ", 'Ви обрали: ', 'Wybrałeś: '];
  text = texts[indexLang];
  if (this.checked == true) {
    filters.push(this.value);
    valueEl.innerHTML = text + filters.map(filter => convertIdInGenre(Number(filter))).join(', ');
  } else {
    filters = filters.filter(element => element !== this.value);
    valueEl.innerHTML = text + filters.map(filter => convertIdInGenre(Number(filter))).join(', ');
  }

  if (filters.length === 0) {
    localStorage.removeItem(STORAGE_KEY_FILTERS);
  }

  if (filters.length !== 0) {
    localStorage.setItem(STORAGE_KEY_FILTERS, JSON.stringify(filters));
  }
  return filters;
}

// ========================= markup filters-genres ========================

export function markupFiltersOfGenres(genre) {
  const filtersMarkup = document.createElement('li');
  filtersMarkup.classList.add('filters__item');
  filtersMarkup.innerHTML = `
        <input type="checkbox" value="${genre.id}" class="filters__checkbox js-filters-check" id="${genre.id}">
        <label class="filters__label" for="${genre.id}">${genre.name}</label>
    `;
  filtersList.appendChild(filtersMarkup);

  let checkboxEl = filtersMarkup.querySelector('.js-filters-check');

  checkboxEl.addEventListener('click', onCheckboxClick);
}

// ================ check in local storage if there are already chosen genres ======

export function checkForChosenGenres() {
  const indexLang = ['en', 'ua', 'pl'].indexOf(localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en');
  const texts = ["You've chosen: ", 'Ви обрали: ', 'Wybrałeś: '];
  text = texts[indexLang];
  if (localStorage.getItem(STORAGE_KEY_FILTERS) === null) {
    return;
  } else {
    let arr = localStorage.getItem(STORAGE_KEY_FILTERS);
    filters = [];
    JSON.parse(arr).forEach(el => {
      const element = document.querySelector(`input[id='${el}']`);
      element.checked = true;
      filters.push(element.value);
      valueEl.innerHTML = text + filters.map(filter => convertIdInGenre(Number(filter))).join(', ');
      return filters;
    });
  }
  return filters;
}

// ========================== filter button event=========

function onFilterBtnClick() {
  const indexLang = ['en', 'ua', 'pl'].indexOf(localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en');
  const texts = ['! choose a genre !', '! виберіть жанр !', '! wybierz gatunek !'];
  text = texts[indexLang];
  if (filters.length === 0) {
    valueEl.innerHTML = text;
    return;
  } else {
    let filterNum = filters.map(filter => Number(filter));
    moviesList.innerHTML = '';
    let allMovies = localStorage.getItem(STORAGE_KEY_MOVIES);
    for (const movie of JSON.parse(allMovies)) {
      let genreIds = movie.genre_ids;
      let op = filterNum.every(element => genreIds.indexOf(element) > -1);
      if (op === true) {
        renderFilteredMovies(movie);
      }
    }
  }
}

function renderFilteredMovies(movie) {
  const movieEl = document.createElement('li');
  movieEl.setAttribute('id', `${movie.id}`);
  movieEl.classList.add('card-item');
  let movieGenres = [];
  for (let i = 0; i < movie.genre_ids.length; i += 1) {
    let genre = convertIdInGenre(movie.genre_ids[i]);
    movieGenres.push(genre);
  }
  movieEl.innerHTML = `
        <div class="card-item__image-box">
        <img src="${IMG_URL + movie.poster_path}" onerror="this.src='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';" alt="Poster of ${
    movie.title
  }" class="card-item__image" />
        </div>
        <p class="card-item__text">${movie.title}<br />
        <span class="card-item__text--orange">${movieGenresManipulationsMarkup(movieGenres)} | ${
    movie.release_date ? movie.release_date.slice(0, 4) : ''
  }</span>
        </p>  
    `;
  moviesList.appendChild(movieEl);
  onCardsSelect();
}

export function checkFilmsSearched(data) {
  if (data.length === 0) {
    filtersWrapper.classList.add('filters__genres-hidden');
  } else {
    filtersWrapper.classList.remove('filters__genres-hidden');
    filtersHideContainer.classList.add('filters__genres-hidden');
  }
}
