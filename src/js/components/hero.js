import markUpFilms from './markUpFilms';
import { getTrendingMovies } from '../services/API';
import { onCardsSelect } from './card-modal';
import { makePagesMarkup, onPageBtnsSelect, getPageNum } from './on-pagination-trending';
import { showSpinner, hideSpinner } from './spinner';
import { activeLanguage } from '../components/translate';
import { axios } from '../services/API';
import { API_KEY, URL } from '../utils/constants';

export const refs = {
  imagesList: document.querySelector('.films-list'),
};

export const container = document.querySelector('.main-container');

container.insertAdjacentHTML(
  'beforeend',
  `<div class="pages-numbers-wrapper">
</div>`,
);

export const pageNumWrapper = document.querySelector('.pages-numbers-wrapper');

export let pageNum = 1;
pushFetch();

export function pushFetch() {
  try {
    showSpinner();
    const response = getTrendingMovies(pageNum);
    sessionStorage.setItem('calculatedPageNum', pageNum);
    return response.then(({ data }) => {
      markUp(data);
      hideSpinner();
      (activeLanguage !== 'uk') && axios.get(`${URL}trending/movie/day?api_key=${API_KEY}&page=${pageNum}&language=uk`).then(({ data }) => { localStorage.setItem('data-ua', `${JSON.stringify(data)}`) });
      (activeLanguage !== 'en') && axios.get(`${URL}trending/movie/day?api_key=${API_KEY}&page=${pageNum}&language=en`).then(({ data }) => { localStorage.setItem('data-en', `${JSON.stringify(data)}`) });
      (activeLanguage !== 'pl') && axios.get(`${URL}trending/movie/day?api_key=${API_KEY}&page=${pageNum}&language=pl`).then(({ data }) => { localStorage.setItem('data-pl', `${JSON.stringify(data)}`) });  
    });
  } catch (error) {
    hideSpinner();
    console.log(error);
  }
}

export function markUp(data) {
  refs.imagesList.insertAdjacentHTML('beforeend', markUpFilms(data.results));
  pageNumWrapper.insertAdjacentHTML('beforeend', makePagesMarkup(getPageNum()));
  sessionStorage.setItem('maxPages', data.total_pages);
  onPageBtnsSelect();
  onCardsSelect();
}
