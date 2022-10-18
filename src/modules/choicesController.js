import Choices from "choices.js";

export const choicesController = () => {
  const option = {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  };

  const selectCategory = document.querySelector('.form__select-category');
  selectCategory._choices = new Choices(selectCategory, {...option, classNames: {
    containerOuter: 'choices form__select-category',
    }});

  const selectPrice = document.querySelector('.form__select-price');
  selectPrice._choices = new Choices(selectPrice, {...option, classNames: {
      containerOuter: 'choices form__select-price',
    }});
}
