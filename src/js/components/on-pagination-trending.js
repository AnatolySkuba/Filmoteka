import { getTrendingMovies } from '../services/API';
import { setItemsToLocalStorage } from './markUpFilms';
import { refs, markUp, pageNumWrapper } from './hero';
import { showSpinner, hideSpinner } from './spinner';
import { hederRef } from './arrowTopBottom/on-top';
import { scrollTo } from './arrowTopBottom/scrollTo';

export function getPageNum() {
  return Number(sessionStorage['calculatedPageNum']);
}

export function makePagesMarkup(num) {
  return `<div class="buttons-container">
  <button type="button" class="btn-num start"><<</button
  ><button type="button" class="btn-num minus">-</button>
  <div class="page-number-box">
    <span class="page-number--fixed">${num}</span>
  </div>
  <button type="button" class="btn-num plus">+</button
  ><button type="button" class="btn-num end">>></button>
</div>`;
}

export function onPageBtnsSelect() {
  const minusBtn = document.querySelector('button.minus');
  const plusBtn = document.querySelector('button.plus');
  const startBtn = document.querySelector('button.start');
  const endBtn = document.querySelector('button.end');

  startBtn.addEventListener('click', onStartBtn);
  endBtn.addEventListener('click', onEndBtn);
  minusBtn.addEventListener('click', onMinusBtn);
  plusBtn.addEventListener('click', onPlusBtn);

  if (getPageNum() === 1) {
    minusBtn.setAttribute('disabled', 'disabled');
    startBtn.setAttribute('disabled', 'disabled');
  }

  if (getPageNum() === Number(sessionStorage['maxPages'])) {
    plusBtn.setAttribute('disabled', 'disabled');
    endBtn.setAttribute('disabled', 'disabled');
  }
}

function onMarkupClean() {
  refs.imagesList.innerHTML = '';
  pageNumWrapper.innerHTML = '';
}

function onTrendingPageMarkupChange() {
  showSpinner();
  onMarkupClean();
  getTrendingMovies(sessionStorage['calculatedPageNum']).then(data => {
    setItemsToLocalStorage(data.data);
    markUp(data.data);
    hideSpinner();
  });
}

function onStartBtn() {
  sessionStorage.setItem('calculatedPageNum', 1);
  onTrendingPageMarkupChange();
  scrollTo(hederRef);
}

function onEndBtn() {
  sessionStorage.setItem('calculatedPageNum', sessionStorage['maxPages']);
  onTrendingPageMarkupChange();
  scrollTo(hederRef);
}

function onMinusBtn() {
  sessionStorage.setItem('calculatedPageNum', getPageNum() - 1);
  onTrendingPageMarkupChange();
  scrollTo(hederRef);
}

function onPlusBtn() {
  sessionStorage.setItem('calculatedPageNum', getPageNum() + 1);
  onTrendingPageMarkupChange();
  scrollTo(hederRef);
}
