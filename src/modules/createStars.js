import imgStar from '../img/star.svg';
import imgStarO from '../img/star-o.svg';

export const createStars = (comments) => {
  const stars = Math.round(comments
    .reduce((acc, item) => item.stars + acc, 0) / comments.length) || 0;

  const wrapper = document.createElement('div');
  wrapper.classList.add('service__stars');
  wrapper.classList.add('stars');

  for (let i =0; i<5; i++) {
    const star = document.createElement('img');
    star.classList.add('service__star');

    if (i === 0) {
      star.alt = `Рейтинг специалиста ${stars} из 5`;
    } else {
      star.alt = '';
    }

    if (stars > i) {
      star.src = imgStar;
    } else {
      star.src = imgStarO;
    }

    wrapper.append(star);
  }

  return wrapper;
}

`<div class="service__stars stars">
<img src="img/star.svg" class="service__star" alt="Рейтинг специалиста 5 из 5">
                  <img src="img/star.svg" class="service__star" alt="">
                  <img src="img/star.svg" class="service__star" alt="">
                  <img src="img/star.svg" class="service__star" alt="">
                  <img src="img/star-o.svg" class="service__star" alt="">
                </div>`
