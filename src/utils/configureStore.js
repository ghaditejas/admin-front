import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const configureStore = globalReducer => createStore(globalReducer, applyMiddleware(thunk));


export default configureStore;
