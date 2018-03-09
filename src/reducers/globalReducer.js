import GlobalModel from './models/global';
import ActionTypes from './actionTypes';
import createReducer from '../utils/createReducer';
import authService from '../services/authService';

const update = (state, action) => {
  console.log('GLOBAL STATE:', state);
  const newState = state.set('isUserLoggedIn', action.payload.isUserLoggedIn)
    .set('userToken', action.payload.userToken)
    .set('userTokenInfo', action.payload.userTokenInfo);
  console.log('GLOBAL STATE CHANGED:', newState);
  return newState;
};

const handlers = {
  [ActionTypes.GLOBAL_UPDATE]: update,
};

// Auth initial state
const initialData = authService.getUserInfo();
let initialState;
if (initialData !== null) {
  initialState = new GlobalModel(initialData);
} else {
  initialState = new GlobalModel();
}

export default createReducer(handlers, initialState);
