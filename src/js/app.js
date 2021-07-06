(function() {
  const form = document.querySelector('.form');
  const button = document.querySelector('.button');
  const modal = document.querySelector('#modal');
  const modal_confirm_button = modal.querySelector('.modal__confirm-button');
  const modal_close_button = modal.querySelector('.modal__close-button');
  const inputName = document.querySelector('.form__input-name');
  const inputPhone = document.querySelector('.form__input-tel');
  const title_lg = document.querySelector('.modal__title-lg');
  const title_sm = document.querySelector('.modal__title-sm');

  // function animateCSS(element, animationName, callback) {
  //   const node = document.querySelector(element);
  //   node.classList.add('animated', animationName);

  //   function handleAnimationEnd() {
  //     node.classList.remove('animated', animationName);
  //     node.removeEventListener('animationend', handleAnimationEnd);

  //     if (typeof callback === 'function') callback();
  //   }

  //   node.addEventListener('animationend', handleAnimationEnd);
  // }

  function ready() {
    form.classList.remove('hide');
  }

  function disableEnable(lg_title, sm_title) {
    title_lg.innerText = lg_title;
    title_sm.innerText = sm_title;

    modal.classList.toggle('display-none');
  }

  function validate() {
    console.log(inputName.value);
  }
  validate();

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    console.log('Good');
  });

  modal_confirm_button.onclick = () => disableEnable();
  modal_close_button.onclick = () => disableEnable();

  document.addEventListener('DOMContentLoaded', ready);
  button.addEventListener('click', function() {
    if (inputName.value && inputPhone.value && !isNaN(inputPhone.value)) {
      disableEnable(
        'Спасибо за Ваш заказ!',
        'Вскоре с вами свяжется наш менеджер.'
      );
    } else if (isNaN(inputPhone.value)) {
      disableEnable(
        'Пожалуйста',
        'Заполните все формы правильно, особенно Ваш номер телефона'
      );
    } else {
      disableEnable('Пожалуйста', 'Заполните все формы.');
    }
  });
})();
