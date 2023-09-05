const MODIFIERS = {
  formGroupHasError: 'form__group--has-error'
}

function init () {
  const elAccessRequestForm = document.querySelector('#access-request-form');
  const elEmailField = document.querySelector('.form__field');

  if (elAccessRequestForm) {
    elAccessRequestForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      elEmailField.parentNode.classList.remove(MODIFIERS.formGroupHasError);

      const elFormErrorMessage = elAccessRequestForm.querySelector('.form__error-message');
      let errorMessage;

      // Check for empty field of .form__field
      if (!elEmailField.value) {
        elEmailField.parentNode.classList.add(MODIFIERS.formGroupHasError);
        errorMessage = 'Oops! Please add your email';
        elFormErrorMessage.textContent = errorMessage
        return;
      }

      // Check for valid email address
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isEmailValid = emailRegex.test(elEmailField.value);

      if (!isEmailValid) {
        elEmailField.parentNode.classList.add(MODIFIERS.formGroupHasError);
        errorMessage = 'Oops! Please check your email';
        elFormErrorMessage.textContent = errorMessage
        return;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
