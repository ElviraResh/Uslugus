import {avatarController} from "./avatarController";
import {postData} from "./postData";
import {API_URL} from "./const";
import {createCard} from "./createCard";
import {auth} from "./auth";


export const signInController = (callback) => {
  const form = document.querySelector('.form-sign-in');
  const button = document.querySelector('.form__submit_sign-in');
  const parent = button.parentNode;
  const errorList = document.createElement('ul');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const dataResponse = await postData(`${API_URL}/api/service/signin`, data);

    if (dataResponse.message) {
      form.querySelectorAll('input').forEach((input) => {
        input.style.border = '1px solid red';
      }) // todo обработка ошибки

      const err = document.createElement('li');
      err.style.fontWeight = '300';
      err.style.fontSize = '14px';
      err.style.color = 'red';
      err.textContent = dataResponse.message;

      errorList.append(err);
      parent.insertBefore(errorList, button);
      return;
    }

    auth(dataResponse);
    form.reset();
    callback(e);
  });
};


export const signUpController = (callback) => {
  const form = document.querySelector('.form-sign-up');
  form.action = `${API_URL}/api/service/signup`;
  const button = document.querySelector('.form__submit_sign-up');
  const parent = button.parentNode;
  const errorList = document.createElement('ul');


  const crp = avatarController({
    inputFile: '.avatar__input',
    uploadResult: '.avatar__result',
  });

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (form.password[0].value !== form.password[1].value) {
      const err = document.createElement('li');
      err.textContent = 'Пароли не совпадают';
      err.style.paddingBottom = '50px';
      err.style.color = 'red';

      errorList.append(err); // todo обработка ошибки
      return;
    }

    if (form.password[0].value === '') {
      const err = document.createElement('li');
      err.textContent = 'Пароль не указан';
      err.style.paddingBottom = '50px';
      err.style.color = 'red';

      errorList.append(err);
      parent.insertBefore(errorList, button); // todo обработка ошибки
      return;
    }

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    data.avatar = await crp.result({
      type: 'base64',
      size: 'viewport',
    });

    if (!data.avatar.includes('base64')) {
      delete data.avatar;
    }

    const dataResponse = await postData(form.action, data, form.dataset.method);

    if (dataResponse.errors) {
      // todo обработка ошибки
      const errors = dataResponse.errors.map((errObj) => {
        const error = document.createElement('li');
        error.style.fontWeight = '300';
        error.style.fontSize = '14px';
        error.style.color = 'red';
        error.textContent = errObj.message;
        return error;
      });
      errorList.append(...errors);
      parent.insertBefore(errorList, button);
      return;
    }

    if (form.dataset.method !== 'PATCH') {
      const servicesList = document.querySelector('.services__list');
      servicesList.append(createCard(dataResponse));
      auth(dataResponse);
    }

    auth(dataResponse);
    form.reset();
    crp.hideAvatar();
    callback(e);
  });
};



