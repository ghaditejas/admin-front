import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Reboot from 'material-ui/Reboot';
import Router from './routes';
import rootReducer from './reducers';
import configureStore from './utils/configureStore';

const store = configureStore(rootReducer);

ReactDOM.render(
    <div className="layOutWrapper">
        <Reboot />
        <Provider store={ store }>
            <Router />
        </Provider>
    </div>,
    document.getElementById('root'),
);

