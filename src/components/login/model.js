import { Record } from 'immutable';

const model = Record({
  loggedIn: false,
  isDoingLoggin: false,
  mailError: false,
  passwordError: false,
  authError: false,
});

export default model;
