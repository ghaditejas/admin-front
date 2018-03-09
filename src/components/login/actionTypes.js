import createActionType from '../../utils/createActionTypes';

export default createActionType([
  'AUTH_REQUEST',
  'AUTH_RESPONSE',
  'AUTH_ERROR',
  'AUTH_ERROR_MAIL',
  'AUTH_ERROR_PASS',
]);
