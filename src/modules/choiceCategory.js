import { renderList } from "./renderList";
import { createCard } from "./createCard";
import { API_URL } from "./const";
import { getData } from "./getData";

export const choiceCategory = () => {

  const buttons = document.querySelectorAll('.category__btn');

  buttons.forEach((button) => {

    button.addEventListener('click', async () => {
      const data = await getData(`${API_URL}/api/service`);

      const arr = data.filter((item, i) => {
        return item.category === button.dataset.value;
      });
      const serviceList = document.querySelector('.services__list');

      serviceList.textContent = '';

      const cards = arr.map(createCard);

      serviceList.append(...cards);
    });
  });





};
