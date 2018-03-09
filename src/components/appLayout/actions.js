import ActionTypes from './actionTypes';

export const mainMenuCollapse = () => (
  {
    type: ActionTypes.MAIN_MENU_COLLAPSE,
  }
);

export const mainMenuExpand = () => (
  {
    type: ActionTypes.MAIN_MENU_EXPAND,
  }
);

export const mainMenuToggle = () => (
  {
    type: ActionTypes.MAIN_MENU_TOGGLE,
  }
);

export const mainMenuItemCollapse = itemIndex => (
  {
    type: ActionTypes.MAIN_MENU_ITEM_COLLAPSE,
    payload: {
      itemIndex,
    },
  }
);

export const mainMenuItemExpand = itemIndex => (
  {
    type: ActionTypes.MAIN_MENU_ITEM_EXPAND,
    payload: {
      itemIndex,
    },
  }
);

export const mainMenuItemToggle = itemIndex => (
  {
    type: ActionTypes.MAIN_MENU_ITEM_TOGGLE,
    payload: {
      itemIndex,
    },
  }
);
