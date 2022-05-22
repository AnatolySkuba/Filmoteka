import { showArrows } from './showArrows';
import { scrollTo } from './scrollTo';

export const hederRef = document.querySelector('.header');
const footer = document.querySelector('.footer');

window.addEventListener('scroll', showArrows);

arrowTop.addEventListener('click', function () {
  scrollTo(hederRef);
});

arrowBottom.addEventListener('click', function () {
  scrollTo(footer);
});
