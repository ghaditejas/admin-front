import ActionTypes from './actionTypes';
import topics from './model';
import createReducer from '../../../utils/createReducer';


const topicsListResponse = (state, action) => state.set('topicsList', action.payload);

const handlers = {
  [ActionTypes.TOPICSLIST_RESPONSE]: topicsListResponse,
};

export default createReducer(handlers, new topics());
