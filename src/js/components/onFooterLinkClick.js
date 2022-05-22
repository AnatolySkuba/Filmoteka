import markUpFooterModal from './markUpFooterModal';
import data from '../../data.json';

const refs = {
  teamLink: document.querySelector('.js-open-modal'),
  modal: document.querySelector('.modal'),
  overlay: document.querySelector('.js-overlay-modal'),
  closeModal: document.querySelector('.js-modal-close'),
  teammateList: document.querySelector('.teammate-list'),
};

function openModal() {
  document.body.classList.add('scroll-off');
  refs.modal.classList.add('active');
  refs.overlay.classList.add('active');
  document.body.addEventListener('keydown', onEscPress);
  markUpModal(data);
}

function closeModal() {
  document.body.classList.remove('scroll-off');
  refs.modal.classList.remove('active');
  refs.overlay.classList.remove('active');
  document.body.removeEventListener('keydown', onEscPress);
  setTimeout(cleanFooterModal, 300);
}

function cleanFooterModal() {
  refs.teammateList.innerHTML = '';
}

function onEscPress(e) {
  const key = e.keyCode;
  if (key == 27) {
    closeModal();
  }
}

refs.teamLink.addEventListener('click', function (e) {
  e.preventDefault();
  openModal();
});

refs.closeModal.addEventListener('click', function () {
  closeModal();
});

refs.overlay.addEventListener('click', function () {
  closeModal();
});

function markUpModal(data) {
  refs.teammateList.insertAdjacentHTML('beforeend', markUpFooterModal(data));
}
