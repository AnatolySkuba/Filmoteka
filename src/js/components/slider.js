import Glide from '@glidejs/glide';
import { getWeekTrendingMovies } from '../services/API';
import filmsCardSliderTpl from './card-films-slider.hbs';
import trailer from './trailers.js';

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
      })
      .catch(error => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

function renderSliderFilms(data) {
  sliderContainer.innerHTML = filmsCardSliderTpl(data);
  trailer.createTrailerLink(document.querySelectorAll('.btn-youtube-slider'));
}
