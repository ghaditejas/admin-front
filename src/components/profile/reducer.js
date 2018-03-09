import ActionTypes from './actionTypes';
import ProfileModel from './model';
import createReducer from '../../utils/createReducer';

const profileChangeLanguage = (state, action) => state.set('language', action.language);
const profileChangeName = (state, action) => state.set('name', action.name);
const profileChangeNone = state => state;

const profileGetRequest = state => state.set('isDoingGetUser', true);
const profileGetResponse = (state, action) => state.set('isDoingGetUser', false)
  .set('userId', action.payload.id)
  .set('email', action.payload.email)
  .set('enterprise', action.payload.accountName)
  .set('rol', action.payload.roleType)
  .set('name', action.payload.name)
  .set('language', action.payload.lang);
const profileGetError = state => state.set('isDoingGetUser', false)
  .set('errorGetUser', true);

const profileUpdateRequest = state => state.set('isDoingUpdateUser', true);
const profileUpdateResponse = (state, action) => state.set('isDoingUpdateUser', false)
  .set('userUpdated', action.payload);
const profileUpdateError = state => state.set('isDoingUpdateUser', false)
  .set('errorGetUser', true);

const profilePasswordChangeRequest = state => state.set('isDoingChangePassword', true);
const profilePasswordChangeResponse = (state, action) => state.set('isDoingChangePassword', false)
  .set('passwordChanged', action.payload);
const profilePasswordChangeError = state => state.set('isDoingChangePassword', false)
  .set('errorPasswordChange', true);

const profileErrorPasswordNew = state => state.set('errorPasswordNew', true);
const profileErrorPasswordRepeat = state => state.set('errorPasswordRepear', true);
const profileErrorPasswordNoMatch = state => state.set('errorPasswordNoMatch', true);

const handlers = {
  [ActionTypes.PROFILE_CHANGE_NAME]: profileChangeName,
  [ActionTypes.PROFILE_CHANGE_LANGUAGE]: profileChangeLanguage,
  [ActionTypes.PROFILE_CHANGE_NONE]: profileChangeNone,
  [ActionTypes.PROFILE_GET_REQUEST]: profileGetRequest,
  [ActionTypes.PROFILE_GET_RESPONSE]: profileGetResponse,
  [ActionTypes.PROFILE_GET_ERROR]: profileGetError,
  [ActionTypes.PROFILE_UPDATE_REQUEST]: profileUpdateRequest,
  [ActionTypes.PROFILE_UPDATE_RESPONSE]: profileUpdateResponse,
  [ActionTypes.PROFILE_UPDATE_ERROR]: profileUpdateError,
  [ActionTypes.PROFILE_PASSWORD_CHANGE_REQUEST]: profilePasswordChangeRequest,
  [ActionTypes.PROFILE_PASSWORD_CHANGE_RESPONSE]: profilePasswordChangeResponse,
  [ActionTypes.PROFILE_PASSWORD_CHANGE_ERROR]: profilePasswordChangeError,
  [ActionTypes.PROFILE_ERROR_PASSWORD_NEW]: profileErrorPasswordNew,
  [ActionTypes.PROFILE_ERROR_PASSWORD_REPEAT]: profileErrorPasswordRepeat,
  [ActionTypes.PROFILE_ERROR_PASSWORD_NO_MATCH]: profileErrorPasswordNoMatch,
};

export default createReducer(handlers, new ProfileModel());
