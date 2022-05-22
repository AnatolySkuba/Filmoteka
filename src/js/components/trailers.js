import * as basicLightbox from 'basiclightbox';
import { showSpinner, hideSpinner } from './spinner';
import { getVideos } from '../services/API';

let lang = localStorage.getItem('active-language') ? localStorage.getItem('active-language') : 'en';
(lang === 'ua') && (lang = 'uk')

function createTrailerLink(elementRef) {
  const trailerBtn = elementRef;

  trailerBtn.forEach(el =>
    el.addEventListener('click', e => {
      showSpinner();
      drawModalForTrailler(e.target.dataset.id);
    }),
  );

  function drawModalForTrailler(movieId) {
    try {
      const response = getVideos(movieId);
      return response
        .then(({ data }) => {
          const id = data.results[0].key;
          const instance = basicLightbox.create(`
  <iframe
    width="980"
    height="525"
    src='https://www.youtube.com/embed/${id}'
    frameborder="0"
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
`);
          instance.show();
          modalClBtTrailer(instance);
          hideSpinner();
        })
        .catch(() => {
          hideSpinner();
          const instance = basicLightbox.create(`
    <img 
      width="980" 
      height="525" 
      src="https://moviemaker.minitool.com/images/uploads/articles/2020/08/youtube-video-not-available/youtube-video-not-available-1.png" 
      alt="no found trailer" 
      class="trailer_video">
      `);
          instance.show();
          modalClBtTrailer(instance);
        });
    } catch (error) {
      console.log(error);
    }
  }

  function modalClBtTrailer(instance) {
    const modalBox = document.querySelector('.basicLightbox--iframe');
    modalBox.insertAdjacentHTML(
      'afterbegin',
      `<button
        type="button"
        class="lightbox__button"
        data-action="close-lightbox">
      </button>
    `,
    );
    const modalCloseBtn = document.querySelector('[data-action="close-lightbox"]');
    modalCloseBtn.addEventListener('click', () => instance.close());
  }
}

export default { createTrailerLink };
