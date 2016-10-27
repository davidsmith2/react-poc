import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {reducer} from './reducer';
import {PanelContainer} from './containers';

let store = createStore(reducer);

export const App = ReactDOM.render(
    <Provider store={store}>
        <PanelContainer />
    </Provider>,
    document.getElementById('root')
);
