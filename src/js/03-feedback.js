import throttle from 'lodash.throttle';

const formObject = {
  KEY_NAME: 'feedback-form-state',
  EMAIL_INPUT_NAME: 'email',
  MESSAGE_INPUT_NAME: 'message',
  formNode: document.querySelector('.feedback-form'),
  formState: {},

  run: function () {
    this.checkStorage();
    this.addInputEventListener();
    this.addSubmitEventListener();
  },

  checkStorage: function () {
    const storageKeyValue = JSON.parse(localStorage.getItem(this.KEY_NAME));
    if (storageKeyValue) {
      this.formState = storageKeyValue;
      this.updateFormFromStorageKey();
    }
  },

  updateFormFromStorageKey: function () {
    const {
      EMAIL_INPUT_NAME: emailName,
      MESSAGE_INPUT_NAME: messageName,
      formNode,
      formState,
    } = this;
    const { [emailName]: email, [messageName]: message } = formNode.elements;
    email.value = formState[emailName];
    message.value = formState[messageName];
  },

  addInputEventListener: function () {
    this.formNode.addEventListener(
      'input',
      throttle(this.updateLocalStorage.bind(this), 500)
    );
  },

  updateLocalStorage: function (event) {
    const { name: inputName, value: inputValue } = event.target;
    this.formState[inputName] = inputValue;
    localStorage.setItem(this.KEY_NAME, JSON.stringify(this.formState));
  },

  addSubmitEventListener: function () {
    this.formNode.addEventListener(
      'submit',
      this.clearLocalStorageAndFormOnSubmit.bind(this)
    );
  },

  clearLocalStorageAndFormOnSubmit: function (event) {
    event.preventDefault();
    this.readCurrentFormValues();
    this.formNode.reset();
    localStorage.removeItem(this.KEY_NAME);
    this.outputFormValues();
  },

  readCurrentFormValues: function () {
    const {
      EMAIL_INPUT_NAME: emailName,
      MESSAGE_INPUT_NAME: messageName,
      formState,
    } = this;
    const { [emailName]: email, [messageName]: message } =
      this.formNode.elements;
    formState[emailName] = email.value;
    formState[messageName] = message.value;
  },

  outputFormValues() {
    console.log(this.formState);
  },
};

formObject.run();
