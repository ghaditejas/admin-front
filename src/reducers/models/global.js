import { Record } from 'immutable';

const model = Record({
  isUserLoggedIn: false,
  userToken: null,
  userTokenInfo: null,
});

export default model;
