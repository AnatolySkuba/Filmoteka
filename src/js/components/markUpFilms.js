import { IMG_URL, STORAGE_KEY_MOVIES } from '../utils/constants';
import { convertIdInGenre, movieGenresManipulationsMarkup } from './genres.js';
import { checkFilmsSearched } from './filters-genres';

export function setItemsToLocalStorage(data) {
  localStorage.setItem(STORAGE_KEY_MOVIES, JSON.stringify(data));
}

export default function markUpFilms(data) {
  if (!data) {
    return;
  }
  checkFilmsSearched(data);
  setItemsToLocalStorage(data);

  return data
    .map(
      ({
        poster_path: posterPath,
        genre_ids: genreIds,
        id: movieId,
        release_date: movieDate,
        title: title,
      }) => {
        let movieGenres = [];
        for (let i = 0; i < genreIds.length; i += 1) {
          let genre = convertIdInGenre(genreIds[i]);
          movieGenres.push(genre);
        }

        return `  
       <li class="card-item" id="${movieId}">                
        <div class="card-item__image-box">
          <img src="${IMG_URL + posterPath}" alt="Poster of ${
          title ? title : ''
        }" onerror="this.src='https://michaelnakache.com/wp-content/uploads/2018/08/movie-poster-coming-soon-2.png';" class="card-item__image" />
        </div>
        <p class="card-item__text">${title ? title : 'Title unavailable'}<br />
         <span class="card-item__text--orange">${movieGenresManipulationsMarkup(movieGenres)} | ${
          movieDate ? movieDate.slice(0, 4) : 'Date unavailable'
        }</span>
        </p>   
        </li>    
       `;
      },
    )
    .join('');
}
