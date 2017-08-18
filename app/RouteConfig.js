import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import Routes from './Routes';
import {createHistory} from 'history';
import {Provider} from 'react-redux';
import ReduxStore from './stores/ReduxStore';

let handleCreateElement = (Component, props) => {
    return <Provider store={ReduxStore}>
        <Component {...props}/>
    </Provider>
};

ReactDOM.render(<Router history={createHistory()} createElement={handleCreateElement}>{Routes}</Router>, document.getElementById('container'));
