import { Record } from 'immutable';
// import languages from '../../utils/languages';

const model = Record({
  userId: 0,
  email: '',
  enterprise: '',
  rol: '',
  name: '',
  language: 'en',
  isDoingGetUser: false,
  errorGetUser: false,
  isDoingUpdateUser: false,
  errorUpdateUser: false,
  userUpdated: false,
  isDoingChangePassword: false,
  errorPasswordChange: false,
  passwordChanged: false,
  errorPasswordNew: false,
  errorPasswordRepear: false,
  errorPasswordNoMatch: false,
});

export default model;
