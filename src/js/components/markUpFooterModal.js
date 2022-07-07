import githubIcon from '../../images/footer/github.png';
import linkedinIcon from '../../images/footer/linkedin.png';

export default function markUpFooterModal(data) {
  return data
    .map(({ id, image, name_en, name_ua, role_en, role_ua, role_pl, about_ua, about_pl, about_en, link }) => {
      let name, role, about
      (`${localStorage.getItem('active-language')}` === 'ua') && (name = name_ua, role = role_ua, about = about_ua);
      (`${localStorage.getItem('active-language')}` === 'null') && (name = name_en, role = role_en, about = about_en);
      (`${localStorage.getItem('active-language')}` === 'en') && (name = name_en, role = role_en, about = about_en);
      (`${localStorage.getItem('active-language')}` === 'pl') && (name = name_en, role = role_pl, about = about_pl);
      return `
    <li class="teammate-list__item" id=${id}>
      <a class="teammate-list__item--link" href=${link} target="_blank">
        <img class="teammate-list__item--image" src=${image} alt="${name}'s photo" width="100" >
      </a>
      <div class="teammate-list__item--description">
        <p class="teammate-list__item--name">${name}</p>
        <p class="teammate-list__item--role">${role}</p>
        <div class="teammate-list__item--socials">
          <a class="teammate-list__item--link" href=${link} target="_blank">
            <img class="teammate-list__item--icon" src=${githubIcon} alt="githubIcon" width=40px />
          </a>
          <a class="teammate-list__item--link" href=${link} target="_blank">
            <img class="teammate-list__item--image" src=${linkedinIcon} alt="linkedinIcon" width=60px />
          </a>
        </div>
        <p class="teammate-list__item--about">${about}</p>
      </div>
    </li>
    `;
    })
    .join('');
}
