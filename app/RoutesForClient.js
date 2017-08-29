import React from 'react';
import {Route} from 'react-router';
import AppContainer from './AppContainer';

let getNewCard = (location, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./components/NewCard').default)
    }, 'NewCard');
}

let getEditCard = (location, callback) => {
    require.ensure([], function(require) {
        callback(null, require('./components/EditCard').default);
    }, 'EditCard');
}

export default (
    <Route path="/" component={AppContainer}>
        <Route path="new" getComponent={getNewCard}/>
        <Route path="edit/:id" getComponent={getEditCard}/>
    </Route>
)
