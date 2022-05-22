import { markUp } from './header';
import { saveLocalStorage } from './genres';

const languages = ['en', 'ua', 'pl'];

const refs = {
  html: document.querySelector('html'),
  footerText: document.querySelector('.footer__text'),
  openModalFooter: document.querySelector('.js-open-modal'),
  listenerLanguage: document.querySelector('.lang-site'),
  currentFlag: document.querySelector('.currentFlag'),
};

const textContents = {
  myLibrary: ['my library', 'бібліотека', 'biblioteka', document.querySelector('.open-my-library-btn')],
  home: ['Home', 'Головна', 'Główna', document.querySelector('.open-home-btn')],
  watched: ['Watched', 'Переглянуто', 'Obejrzane', document.querySelector('.library-btn_watched')],
  queue: ['Queue', 'Черга', 'Kolejka', document.querySelector('.library-btn_queue')],
  modalFooterTitle: ['Developers teammate', 'Розробники', 'Deweloperzy', document.querySelector('.modal__title')],
  openModalFooter: ['GoIT Students', 'Студентами GoIT', 'przez Studentów GoIT', document.querySelector('.js-open-modal')],
  filtersChoose: ['Choose your favorite genres', 'Виберіть свої улюблені жанри', 'Wybierz swoje ulubione gatunki', document.querySelector('.filters__choose')],
  filtersText: ['*You can sort movies on the current page', '*Ви можете сортувати фільми на поточній сторінці', '*Możesz sortować filmy na bieżącej stronie', document.querySelector('.filters__text')],
  filtersFilter: ['filter movies on the current page', 'фільтрувати фільми на поточній сторінці', 'filtruj filmy na stronie tsurrent', document.querySelector('.filters__filter')],
  sliderTitle: ['Trending movies', 'Популярні фільми', 'Popularne filmy', document.querySelector('.slider-title')],
};

const placeholders = {
  searchForm: ['Search films...', 'Пошук фільмів...', 'Znajdź film...', document.querySelector('.search__input')],
};

const attributesHref = {
  ua: document.querySelector('#ua use').getAttribute('href'),
  en: document.querySelector('#en use').getAttribute('href'),
  pl: document.querySelector('#pl use').getAttribute('href'),
  heart: document.querySelector('.footer__text use').getAttribute('href'),
};

let activeLanguage = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';

onLanguageChange(activeLanguage);

function onLanguageChange(lang) {
  languages.forEach(el => document.body.classList.remove(el));
  document.body.classList.add(lang);
  refs.html.setAttribute('lang', lang);
};

refs.currentFlag.insertAdjacentHTML('afterbegin', `<use href="${attributesHref[activeLanguage]}"></use>`)

refs.currentUse = document.querySelector('.currentFlag use');

refs.openModalFooter.insertAdjacentHTML('beforebegin', `<span class="footer__lang--ua">&copy; 2022 | Усі права захищено | Розроблено з <svg width="14px" height="12"><use href="${attributesHref.heart}"></use></svg> </span>`)
refs.openModalFooter.insertAdjacentHTML('beforebegin', `<span class="footer__lang--pl">&copy; 2022 | Wszelkie prawa zastrzeżone | opracowany z <svg width="14px" height="12"><use href="${attributesHref.heart}"></use></svg> </span>`)

refs.listenerLanguage.addEventListener('click', function(evt) {
  evt.preventDefault();
  const selectedLanguageHref = evt.target.getAttribute('href');
  const selectedLanguage = selectedLanguageHref.slice(selectedLanguageHref.length - 2, selectedLanguageHref.length);
  translateAttributes(selectedLanguage);
  onLanguageChange(selectedLanguage);
  saveLocalStorage(JSON.parse(localStorage.getItem(`genres-${selectedLanguage}`)).genres);
  markUp(JSON.parse(localStorage.getItem(`data-${selectedLanguage}`)));
  translateTextContent(selectedLanguage);
  translatePlaceholder(selectedLanguage);
});

function translateAttributes(lang) {
  refs.currentUse.setAttribute('href', attributesHref[lang]);
  refs.html.setAttribute('lang', lang);
  localStorage.setItem('active-language', lang);
};

translateTextContent(activeLanguage);
translatePlaceholder(activeLanguage);

function translateTextContent(lang) {
  languages.forEach((el, index) => {
    (el === lang) && (Object.keys(textContents).forEach(e => {
      textContents[e][3].textContent = textContents[e][index]
    }))
  });
};

function translatePlaceholder(lang) {
  languages.forEach((el, index) => {
    (el === lang) && (Object.keys(placeholders).forEach(e => {
      placeholders[e][3].placeholder = placeholders[e][index]
    }))
  });
};

(activeLanguage === 'ua') && (activeLanguage = 'uk');

export {activeLanguage, textContents}