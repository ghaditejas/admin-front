import actionTypes from './actionTypes';
import toolsService from '../../../services/toolsService';

export const extAppsResponse = response => ({
  type: actionTypes.EXTAPPSLIST_RESPONSE,
  payload: response,
});

export const extAppsRequest = () => async (dispatch) => {
  const extAppsRes = await toolsService.getExtApps(1);
  dispatch(extAppsResponse(extAppsRes));
};


