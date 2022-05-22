const checkbox = document.querySelector('#theme-check');

const Theme = {
  DEFAULT: 'default-theme',
  DARK: 'dark-theme',
};

document.body.classList.add(Theme.DEFAULT);

checkbox.addEventListener('change', onCheckboxChange);

function onCheckboxChange() {
  document.body.classList.toggle(Theme.DARK);
  document.body.classList.toggle(Theme.DEFAULT);

  setThemeInfoToLocalStorage();
};

function setThemeInfoToLocalStorage() {
  if (document.body.classList.contains(Theme.DEFAULT)) {
    checkbox.setAttribute('checked', false);
    localStorage.setItem('active-theme', Theme.DEFAULT);
  } else if (document.body.classList.contains(Theme.DARK)) {
    checkbox.setAttribute('checked', true);
    localStorage.setItem('active-theme', Theme.DARK);
  };
};

getThemeInfoFromLocalStorage();

function getThemeInfoFromLocalStorage() {
  if (localStorage.getItem('active-theme') === Theme.DARK) {
    onCheckboxChange();
  };
};