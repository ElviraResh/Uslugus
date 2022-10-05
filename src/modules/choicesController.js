import Choices from "choices.js";

export const choicesController = () => {
  const option = {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
  };

  new Choices('.form__select-category', {...option, classNames:{
    containerOuter: 'choices form__select-category',
    }});
  new Choices('.form__select-price', {...option, classNames:{
      containerOuter: 'choices form__select-price',
    }});
}
