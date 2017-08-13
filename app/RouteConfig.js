import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router';
import Routes from './Routes';
import {createHistory} from 'history';

ReactDOM.render(<Router history={createHistory()}>{Routes}</Router>, document.getElementById('container'));
