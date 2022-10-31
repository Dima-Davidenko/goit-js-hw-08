import throttle from 'lodash.throttle';

const formObject = {
  KEY_NAME: 'feedback-form-state',
  EMAIL_INPUT_NAME: 'email',
  MESSAGE_INPUT_NAME: 'message',
  formNode: document.querySelector('.feedback-form'),
  formState: {},

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
    const {
      EMAIL_INPUT_NAME: emailName,
      MESSAGE_INPUT_NAME: messageName,
      formNode,
      formState,
    } = formObject;
    const { [emailName]: email, [messageName]: message } = formNode.elements;
    email.value = formState[emailName];
    message.value = formState[messageName];
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
    const {
      EMAIL_INPUT_NAME: emailName,
      MESSAGE_INPUT_NAME: messageName,
      formState,
    } = formObject;
    const { [emailName]: email, [messageName]: message } =
      formObject.formNode.elements;
    formState[emailName] = email.value;
    formState[messageName] = message.value;
  },

  outputFormValues() {
    console.log(formObject.formState);
  },
};

formObject.run();
