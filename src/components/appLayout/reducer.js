import ActionTypes from './actionTypes';
import Model from './model';
import createReducer from '../../utils/createReducer';


const mainMenuCollapse = state => (
  state.set('isOpened', false)
);

const mainMenuExpand = state => (
  state.set('isOpened', true)
);

const mainMenuToggle = state => (
  state.set('isOpened', !state.get('isOpened'))
);

const mainMenuItemCollapse = (state, action) => {
  const oldList = state.get('menuItemsOpened');
  const newList = [...oldList];
  newList[action.payload.itemIndex] = false;
  return state.set('menuItemsOpened', newList);
};

const mainMenuItemExpand = (state, action) => {
  const oldList = state.get('menuItemsOpened');
  const newList = [...oldList];
  newList[action.payload.itemIndex] = true;
  return state.set('menuItemsOpened', newList);
};

const mainMenuItemToggle = (state, action) => {
  const oldList = state.get('menuItemsOpened');
  const newList = [...oldList];
  newList[action.payload.itemIndex] = !oldList[action.payload.itemIndex];
  return state.set('menuItemsOpened', newList);
};

const handlers = {
  [ActionTypes.MAIN_MENU_COLLAPSE]: mainMenuCollapse,
  [ActionTypes.MAIN_MENU_EXPAND]: mainMenuExpand,
  [ActionTypes.MAIN_MENU_TOGGLE]: mainMenuToggle,
  [ActionTypes.MAIN_MENU_ITEM_COLLAPSE]: mainMenuItemCollapse,
  [ActionTypes.MAIN_MENU_ITEM_EXPAND]: mainMenuItemExpand,
  [ActionTypes.MAIN_MENU_ITEM_TOGGLE]: mainMenuItemToggle,
};

export default createReducer(handlers, new Model());
