import actionTypes from '../actionTypes';
import history from '../../utils/history';

export const _updateAuth = authObject => ({
  type: actionTypes.GLOBAL_UPDATE,
  payload: authObject,
});

export const redirect = () => {
  history.push('/');
  return {
    type: 'NO_OP',
  };
};

export const updateAuth = authObject => (dispatch) => {
  dispatch(_updateAuth(authObject));
  dispatch(redirect());
};
