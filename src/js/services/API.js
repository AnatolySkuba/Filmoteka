import { API_KEY, URL } from '../utils/constants';
export const axios = require('axios');

export const getTrendingMovies = page => {
  let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  (activeLanguage === 'ua') && (activeLanguage = 'uk');
  const url = `${URL}trending/movie/day?api_key=${API_KEY}&page=${page}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getWeekTrendingMovies = () => {
  let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  (activeLanguage === 'ua') && (activeLanguage = 'uk');
  const url = `${URL}trending/movie/week?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getMovieById = movieId => {
  let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  (activeLanguage === 'ua') && (activeLanguage = 'uk');
  const url = `${URL}movie/${movieId}?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getSearchMovie = (movie, page) => {
  let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  (activeLanguage === 'ua') && (activeLanguage = 'uk');
  const url = `${URL}search/movie?api_key=${API_KEY}&query=${movie}&page=${page}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export const getGenres = () => {
  let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  (activeLanguage === 'ua') && (activeLanguage = 'uk');
  const url = `${URL}genre/movie/list?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
};

export function getVideos(movieId) {
  let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
  (activeLanguage === 'ua') && (activeLanguage = 'uk');
  const url = `${URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=${activeLanguage}`;
  const response = axios.get(url);
  return response;
}