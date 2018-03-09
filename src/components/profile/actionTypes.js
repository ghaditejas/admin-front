import createActionType from '../../utils/createActionTypes';

export default createActionType([
  'PROFILE_CHANGE_NAME',
  'PROFILE_CHANGE_LANGUAGE',
  'PROFILE_CHANGE_NONE',
  'PROFILE_GET_REQUEST',
  'PROFILE_GET_ERROR',
  'PROFILE_UPDATE_RESPONSE',
  'PROFILE_UPDATE_REQUEST',
  'PROFILE_UPDATE_ERROR',
  'PROFILE_GET_RESPONSE',
  'PROFILE_PASSWORD_CHANGE_REQUEST',
  'PROFILE_PASSWORD_CHANGE_ERROR',
  'PROFILE_PASSWORD_CHANGE_RESPONSE',
  'PROFILE_ERROR_PASSWORD_NEW',
  'PROFILE_ERROR_PASSWORD_REPEAT',
  'PROFILE_ERROR_PASSWORD_NO_MATCH',
]);