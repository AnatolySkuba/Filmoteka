import markUpFilms from './markUpFilms';
import { getSearchMovie } from '../services/API';
import { onCardsSelect } from './card-modal';
import { renderWatchedLibrary, renderQueueLibrary } from './libraryRender';
import { makePagesMarkup, onPageBtnsSelect, getPageNum } from './on-pagination-search';
import { pageNumWrapper, pushFetch } from './hero';
import { showSpinner, hideSpinner } from './spinner';
import Swal from 'sweetalert2';

export const libraryNavEl = document.querySelector('.nav__link-library');
const homeNavEl = document.querySelector('.nav__link-home');
const headerEl = document.querySelector('.header');
const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search__input');
const libraryButtons = document.querySelector('.header-buttons-library');
const filmsList = document.querySelector('.films-list');
const filtersSection = document.querySelector('.filters');
const imagesList = document.querySelector('.films-list');
const logo = document.querySelector('.logo');

export const refsLibrary = {
  watchedBtn: document.querySelector('.library-btn_watched'),
  queueBtn: document.querySelector('.library-btn_queue'),
  watchedList: document.querySelector('.films-list-watched'),
  queueList: document.querySelector('.films-list-queue'),
};

libraryNavEl.addEventListener('click', onLibraryClick);
homeNavEl.addEventListener('click', onHomeClick);
logo.addEventListener('click', onHomeClick);
refsLibrary.watchedBtn.addEventListener('click', renderWatchedLibrary);
refsLibrary.queueBtn.addEventListener('click', renderQueueLibrary);

function onHomeClick() {
  libraryNavEl.classList.remove('current');
  homeNavEl.classList.add('current');
  headerEl.classList.remove('header-library');
  searchForm.classList.remove('visually-hidden');
  libraryButtons.classList.add('visually-hidden');
  filmsList.classList.remove('visually-hidden');
  refsLibrary.queueList.classList.add('visually-hidden');
  refsLibrary.watchedList.classList.add('visually-hidden');
  pageNumWrapper.innerHTML = '';
  filmsList.innerHTML = '';
  refsLibrary.watchedBtn.removeEventListener('click', renderWatchedLibrary);
  refsLibrary.queueBtn.removeEventListener('click', renderQueueLibrary);
  pushFetch();
  filtersSection.classList.remove('visually-hidden');
}

function onLibraryClick(event) {
  homeNavEl.classList.remove('current');
  event.target.classList.add('current');
  libraryButtons.classList.remove('visually-hidden');
  filmsList.classList.add('visually-hidden');
  refsLibrary.watchedList.classList.remove('visually-hidden');
  refsLibrary.queueList.classList.remove('visually-hidden');
  searchForm.classList.add('visually-hidden');
  headerEl.classList.add('header-library');
  libraryNavEl.disabled = true;
  pageNumWrapper.innerHTML = '';
  searchInput.value = '';
  refsLibrary.watchedBtn.addEventListener('click', renderWatchedLibrary);
  refsLibrary.queueBtn.addEventListener('click', renderQueueLibrary);
  renderWatchedLibrary(event);
  filtersSection.classList.add('visually-hidden');
}

libraryButtons.classList.add('visually-hidden');

searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  if (searchInput.value === '')
    return Swal.fire({
      position: 'top',
      title: 'Please enter a search movie',
      showConfirmButton: false,
      timer: 1500,
      background: 'darkgray',
      color: 'black',
    });

  pushFetchSearch(searchInput.value);

  if (!searchInput.value) {
    return;
  }
}

function pushFetchSearch(movie) {
  showSpinner();
  sessionStorage.setItem('calculatedPageNum', 1);
  sessionStorage.setItem('movieName', movie);
  pageNumWrapper.innerHTML = '';
  try {
    const response = getSearchMovie(movie, sessionStorage['calculatedPageNum']);
    return response.then(data => {
      markUp(data.data);
      hideSpinner();
    });
  } catch (error) {
    console.log(error);
    hideSpinner();
  }
}

export function markUp(data) {
  // console.log('onSearch', data);
  if (data.total_results === 0) {
    pageNumWrapper.innerHTML = '';
    filmsList.innerHTML = '';
    pushFetch();
    Swal.fire({
      position: 'top',
      title: 'Search result not successful',
      showConfirmButton: false,
      timer: 1500,
      background: 'orange',
      color: 'black',
    });
    return;
  }
  pageNumWrapper.innerHTML = '';
  imagesList.innerHTML = '';
  imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  pageNumWrapper.insertAdjacentHTML('beforeend', makePagesMarkup(getPageNum()));

  sessionStorage.setItem('maxPages', data.total_pages);
  onPageBtnsSelect();
  onCardsSelect();
}
