import ActionTypes from './actionTypes';
import extApps from './model';
import createReducer from '../../utils/createReducer';


const authUserRequest = state => state.set('isDoingLoggin', true);

const authUserResponse = (state, action) => state.set('isDoingLoggin', false)
  .set('authError', false)
  .set('mailError', false)
  .set('passwordError', false)
  .set('loggedIn', action.payload);

const authUserErrorMail = (state, action) => state.set('mailError', action.payload);

const authUserErrorPassword = (state, action) => state.set('passwordError', action.payload);

const authUserError = state => state.set('isDoingLoggin', false)
  .set('mailError', false)
  .set('passwordError', false)
  .set('authError', true);

const handlers = {
  [ActionTypes.AUTH_REQUEST]: authUserRequest,
  [ActionTypes.AUTH_RESPONSE]: authUserResponse,
  [ActionTypes.AUTH_ERROR_MAIL]: authUserErrorMail,
  [ActionTypes.AUTH_ERROR_PASS]: authUserErrorPassword,
  [ActionTypes.AUTH_ERROR]: authUserError,
};

export default createReducer(handlers, new extApps());
