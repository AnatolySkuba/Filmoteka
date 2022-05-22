const arrowTop = document.querySelector('#arrowTop');
const arrowBottom = document.querySelector('#arrowBottom');

export function showArrows() {
  // висота вікна (область перегляду браузера)
  let viewportHeight = document.documentElement.clientHeight;
  // висота HTML-сторінки
  let htmlHeight = document.documentElement.scrollHeight;
  // обмежувач за висотою для видимості нижньої стрілки
  let heightLimiter = htmlHeight - 2 * viewportHeight;
  if (pageYOffset < viewportHeight) {
    arrowTop.classList.add('arrow--show');
  }
  if (pageYOffset > heightLimiter) {
    arrowTop.classList.add('arrow--show');
  }
}
