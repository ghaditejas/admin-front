import { Record } from 'immutable';

const model = Record({
  isOpened: true,
  menuItemsOpened: Array(6).fill(false),
});

export default model;
