import {renderList} from "./renderList";
import {API_URL} from "./const";

export const choiceCategory = () => {
  const categories = document.querySelectorAll('.category__btn');
  console.log(categories);
  /*const category = [categories.getAttribute('Data-value')];*/

  categories.forEach(category => {
    const item = category.getAttribute('data-value');



  })


}
