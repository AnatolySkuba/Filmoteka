import { getGenres } from '../services/API';
import { STORAGE_KEY_GENRES } from '../utils/constants';
import { checkForChosenGenres, markupFiltersOfGenres } from './filters-genres';
import { API_KEY, URL } from '../utils/constants';
import { activeLang } from '../components/translate';
import { axios } from '../services/API';

pushFetch();

function pushFetch() {
  try {
    const response = getGenres();
    return response.then(({ data }) => saveLocalStorage(data.genres));
  } catch (error) {
    console.log(error);
  }
}

export function saveLocalStorage(data) {
  (activeLang !== 'uk') && axios.get(`${URL}genre/movie/list?api_key=${API_KEY}&language=uk`).then(({ data }) => { localStorage.setItem('genres-ua', `${JSON.stringify(data)}`) });
  (activeLang !== 'en') && axios.get(`${URL}genre/movie/list?api_key=${API_KEY}&language=en`).then(({ data }) => { localStorage.setItem('genres-en', `${JSON.stringify(data)}`) });
  (activeLang !== 'pl') && axios.get(`${URL}genre/movie/list?api_key=${API_KEY}&language=pl`).then(({ data }) => { localStorage.setItem('genres-pl', `${JSON.stringify(data)}`) });
  localStorage.setItem(STORAGE_KEY_GENRES, JSON.stringify(data));

  const element = document.querySelector('.js-filters-list');
  while (element.firstChild) {
  element.removeChild(element.firstChild);
  };

  data.map(genre => markupFiltersOfGenres(genre));
  checkForChosenGenres();
}

export function convertIdInGenre(id) {
  let arr = localStorage.getItem(STORAGE_KEY_GENRES);
  for (const el of JSON.parse(arr)) {
    if (el.id === id) {
      return el.name;
    }
  }
}

export function movieGenresManipulationsMarkup(arr) {
  const indexLang = ['en', 'ua', 'pl'].indexOf(localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en');
  const string = [', Other', ', Інші', ', Inne'];
  if (arr) {
    if (arr.length === 0) {
      return 'Genre unavailable';
    } else if (arr.length <= 2) {
      return arr.slice().join(', ');
    } else {
      return arr.slice(0, 2).join(', ') + `${string[indexLang]}`.toLowerCase();
    }
  }
}

export function movieGenresModalMarkup(arr) {
  if (arr.length === 0) {
    return 'Genre unavailable';
  } else if (arr) {
    return arr.join(', ');
  } else {
    return '';
  }
}
