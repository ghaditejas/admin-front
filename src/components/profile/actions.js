import ActionTypes from './actionTypes';
import languages from '../../utils/languages';
import UserService from '../../services/userService';
// import { updatePass } from '../../reducers/actions';

export const handleChange = (name, value) => {
  if (name === 'name') {
    return {
      type: ActionTypes.PROFILE_CHANGE_NAME,
      name: value,
    };
  } else if (name === 'language') {
    const language = Object.keys(languages).find(key => languages[key] === value);
    return {
      type: ActionTypes.PROFILE_CHANGE_LANGUAGE,
      language,
    };
  }
  return {
    type: ActionTypes.PROFILE_CHANGE_NONE,
  };
};

const getProfileRequesting = () => ({
  type: ActionTypes.PROFILE_GET_REQUEST,
});

export const getProfileResponse = (response) => {
  let action;
  console.log(response);
  if (response === false) {
    action = {
      type: ActionTypes.PROFILE_GET_ERROR,
    };
  } else {
    action = {
      type: ActionTypes.PROFILE_GET_RESPONSE,
      payload: response,
    };
  }
  return action;
};

export const getProfile = userId => async (dispatch) => {
  dispatch(getProfileRequesting());
  const res = await UserService.getUser(userId);
  dispatch(getProfileResponse(res));
};

const updateProfileRequesting = () => ({
  type: ActionTypes.PROFILE_UPDATE_REQUEST,
});

export const updateProfileResponse = (response) => {
  let action;
  console.log(response);
  if (response === false) {
    action = {
      type: ActionTypes.PROFILE_UPDATE_ERROR,
    };
  } else {
    action = {
      type: ActionTypes.PROFILE_UPDATE_RESPONSE,
      payload: response,
    };
  }
  return action;
};

export const saveChanges = user => async (dispatch) => {
  const newUser = {
    ...user,
    lang: Object.keys(languages).find(key => languages[key] === user.lang),
  };
  console.log(newUser);
  dispatch(updateProfileRequesting());
  const res = await UserService.updateUser(newUser);
  dispatch(updateProfileResponse(res));
};

const changePasswordRequesting = () => ({
  type: ActionTypes.PROFILE_PASSWORD_CHANGE_REQUEST,
});

export const changePasswordResponse = (response) => {
  let action;
  console.log({ changePassword: response });
  if (response === false) {
    action = {
      type: ActionTypes.PROFILE_PASSWORD_CHANGE_ERROR,
    };
  } else {
    action = {
      type: ActionTypes.PROFILE_PASSWORD_CHANGE_RESPONSE,
      payload: true,
    };
  }
  return action;
};

export const changePasswordErrorPasswordNew = err => ({
  type: ActionTypes.PROFILE_ERROR_PASSWORD_NEW,
  payload: err,
});

export const changePasswordErrorPasswordRepeat = err => ({
  type: ActionTypes.PROFILE_ERROR_PASSWORD_REPEAT,
  payload: err,
});

export const changePasswordErrorNoMatch = err => ({
  type: ActionTypes.PROFILE_ERROR_PASSWORD_NO_MATCH,
  payload: err,
});

export const changePasswordRequest = (user, currentPassword, newPassword) => async (dispatch) => {
  dispatch(changePasswordRequesting());
  console.log(currentPassword, ',', newPassword);
  const res = await UserService.updateUser(user, currentPassword, newPassword);
  dispatch(changePasswordResponse(res));
};

export const changePassword = (user, currentPassword, newPassword, repeatPassword) => {
  let action;
  console.log(currentPassword, ',', newPassword);
  // TODO: add password restrictions
  if (newPassword === undefined || newPassword < 1) {
    action = changePasswordErrorPasswordNew(true);
  } else if (repeatPassword === undefined || repeatPassword < 1) {
    action = changePasswordErrorPasswordRepeat(true);
  } else if (newPassword !== repeatPassword) {
    action = changePasswordErrorNoMatch(true);
  } else {
    action = changePasswordRequest(user, currentPassword, newPassword);
  }

  return action;
};
