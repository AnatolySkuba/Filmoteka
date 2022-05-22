import Glide from '@glidejs/glide';
import { getWeekTrendingMovies } from '../services/API';
import filmsCardSliderTpl from './card-films-slider.hbs';
import trailer from './trailers.js';
import { axios } from '../services/API';
import { API_KEY, URL } from '../utils/constants';

let lang = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
(lang === 'ua') && (lang = 'uk')

const sliderContainer = document.querySelector('.js-slider-container');
renderTrendy();

const glide = new Glide('.glide', {
  type: 'slider',
  startAt: 0,
  perView: 8,
  autoplay: 3000,
  hoverpause: true,
  bound: true,
});

glide.mount();

function renderTrendy() {
  try {
    const response = getWeekTrendingMovies();
    return response
      .then(({ data }) => {
        renderSliderFilms(data.results);
        localStorage.setItem('slider-en', `${JSON.stringify(data.results)}`);
        axios.get(`${URL}trending/movie/week?api_key=${API_KEY}&language=uk`).then(({ data }) => { localStorage.setItem('slider-ua', `${JSON.stringify(data.results)}`) });
        // axios.get(`${URL}trending/movie/week?api_key=${API_KEY}&language=en`).then(({ data }) => { localStorage.setItem('slider-en', `${JSON.stringify(data.results)}`) });
        axios.get(`${URL}trending/movie/week?api_key=${API_KEY}&language=pl`).then(({ data }) => { localStorage.setItem('slider-pl', `${JSON.stringify(data.results)}`) }); 
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

export function renderSliderFilms(data) {
  sliderContainer.innerHTML = filmsCardSliderTpl(data);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}
