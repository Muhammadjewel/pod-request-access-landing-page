const MODIFIERS = {
  formGroupHasError: 'form__group--has-error'
};
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function init () {
  const elAccessRequestForm = document.querySelector('#access-request-form');
  const elEmailField = document.querySelector('.form__field');
  const elFormErrorMessage = elAccessRequestForm.querySelector('.form__error-message');


  function removeErrorMessage () {
    elEmailField.parentNode.classList.remove(MODIFIERS.formGroupHasError);
  }

  function displayErrorMessage (errorMessage) {
    elEmailField.parentNode.classList.add(MODIFIERS.formGroupHasError);
    elFormErrorMessage.textContent = errorMessage;
    return errorMessage;
  }

  function displaySuccessMessage (email) {
    elAccessRequestForm.querySelector('.form__group').remove();
    elAccessRequestForm.querySelector('.form__success').style.display = 'block';
    elAccessRequestForm.querySelector('.form__success-email').textContent = email;
  }


  // Show submitted email address and remove form
  if (localStorage.getItem('access-request-email')) {
    displaySuccessMessage(localStorage.getItem('access-request-email'));
    return;
  }


  if (elAccessRequestForm) {
    elAccessRequestForm.addEventListener('submit', function (evt) {
      evt.preventDefault();
      removeErrorMessage();

      // Check for empty field of .form__field
      if (!elEmailField.value) {
        displayErrorMessage('Oops! Please add your email');
        return;
      }

      // Check for valid email address
      const isEmailValid = REGEX_EMAIL.test(elEmailField.value);
      if (!isEmailValid) {
        displayErrorMessage('Oops! Please check your email');
        return;
      }

      // Disable button
      elAccessRequestForm.querySelector('button').disabled = true;

      // Submit form
      const data = new FormData(elAccessRequestForm);
      const action = evt.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        localStorage.setItem('access-request-email', data.get('email'));
        displaySuccessMessage(data.get('email'));
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', init);
