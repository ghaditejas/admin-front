import ActionTypes from './actionTypes';
import extAppsListModel from './model';
import createReducer from '../../../utils/createReducer';


const extAppsListResponse = (state, action) => state.set('extAppsList', action.payload);

const handlers = {
  [ActionTypes.EXTAPPSLIST_RESPONSE]: extAppsListResponse,
};

export default createReducer(handlers, new extAppsListModel());
