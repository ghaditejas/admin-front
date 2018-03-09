import ActionTypes from './actionTypes';
import Authservice from '../../services/authService';
import { updateAuth } from '../../reducers/actions';

const authUserRequesting = () => ({
  type: ActionTypes.AUTH_REQUEST,
});

export const authUserResponse = (response) => {
  let action;
  if (response === false) {
    action = {
      type: ActionTypes.AUTH_ERROR,
    };
  } else {
    action = {
      type: ActionTypes.AUTH_RESPONSE,
      payload: true,
    };
  }
  return action;
};

export const authUserError = err => ({
  type: ActionTypes.AUTH_ERROR,
  payload: err,
});

export const authUserErrorMail = bError => ({
  type: ActionTypes.AUTH_ERROR_MAIL,
  payload: bError,
});

export const authUserErrorPassword = bError => ({
  type: ActionTypes.AUTH_ERROR_PASS,
  payload: bError,
});

export const authUserRequest = (email, password) => async (dispatch) => {
  dispatch(authUserRequesting());
  const res = await Authservice.authUser(email, password);
  dispatch(authUserResponse(res));
  if (res !== false && res !== null) {
    dispatch(updateAuth(res));
  }
};

export const authUser = (mail, password) => {
  let action;
  if (mail === undefined || mail < 1) {
    action = authUserErrorMail(true);
  } else if (password === undefined || password < 1) {
    action = authUserErrorPassword(true);
  } else {
    action = authUserRequest(mail, password);
  }
  return action;
};
