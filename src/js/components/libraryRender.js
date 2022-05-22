import { refsLibrary } from './header';
import markUpFilms from './markUpFilms';
import { onCardsSelect } from './card-modal';

export function renderWatchedLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.add('library-btn-current');
  refsLibrary.queueBtn.classList.remove('library-btn-current');
  const libData = JSON.parse(localStorage.getItem('WatchedLibrary'));
  console.log(libData);
  if (libData===null) {
    return;
  };
  markUpLib(libData);
}

export function renderQueueLibrary(e) {
  e.preventDefault();
  refsLibrary.watchedBtn.classList.remove('library-btn-current');
  refsLibrary.queueBtn.classList.add('library-btn-current');
  const libData = JSON.parse(localStorage.getItem('QueueLibrary'));
  if (libData===null) {
    return;
  };
  markUpLib(libData);
}

function markUpLib(data) {
  refsLibrary.watchedList.innerHTML = '';
  refsLibrary.watchedList.insertAdjacentHTML('beforeend', markUpFilms(data));
  onCardsSelect();
}
