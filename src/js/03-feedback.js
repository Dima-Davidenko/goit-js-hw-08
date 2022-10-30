import throttle from 'lodash.throttle';

const formObject = {
  KEY_NAME: 'feedback-form-state',
  EMAIL_INPUT_NAME: 'email',
  MESSAGE_INPUT_NAME: 'message',
  formNode: document.querySelector('.feedback-form'),
  formState: {
    email: '',
    message: '',
  },

  run: function () {
    formObject.checkStorage();
    formObject.addInputEventListener();
    formObject.addSubmitEventListener();
  },

  checkStorage: function () {
    const storageKeyValue = JSON.parse(
      localStorage.getItem(formObject.KEY_NAME)
    );
    if (storageKeyValue) {
      formObject.formState = storageKeyValue;
      formObject.updateFormFromStorageKey();
    }
  },

  updateFormFromStorageKey: function () {
    const { email, message } = formObject.formNode.elements;
    email.value = formObject.formState.email;
    message.value = formObject.formState.message;
  },

  addInputEventListener: function () {
    formObject.formNode.addEventListener(
      'input',
      throttle(formObject.updateLocalStorage, 500)
    );
  },

  updateLocalStorage: function (event) {
    const { name: inputName, value: inputValue } = event.target;
    formObject.formState[inputName] = inputValue;
    localStorage.setItem(
      formObject.KEY_NAME,
      JSON.stringify(formObject.formState)
    );
  },

  addSubmitEventListener: function () {
    formObject.formNode.addEventListener(
      'submit',
      formObject.clearLocalStorageAndFormOnSubmit
    );
  },

  clearLocalStorageAndFormOnSubmit: function (event) {
    event.preventDefault();
    formObject.readCurrentFormValues();
    formObject.formNode.reset();
    localStorage.removeItem(formObject.KEY_NAME);
    formObject.outputFormValues();
  },

  readCurrentFormValues: function () {
    const { email, message } = formObject.formNode.elements;
    formObject.formState.email = email.value;
    formObject.formState.message = message.value;
  },

  outputFormValues() {
    console.log(formObject.formState);
  },
};

formObject.run();
