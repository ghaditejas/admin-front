import config from '../config';

export default function createReducer(actionHandler, initialState) {
  return (state = initialState, action) => {
    const handler = actionHandler[action.type];

    if (!handler) return state;

    const newState = handler(state, action);
    if (config.debugActions) {
      console.log('ACTION:', action, 'NEW STATE', newState);
    }

    return newState;
  };
}
