import React from 'react';
import {Route} from 'react-router';
import NewCard from './components/NewCard';
import EditCard from './components/EditCard';
import AppContainer from './AppContainer';

export default (
    <Route path="/" component={AppContainer}>
        <Route path="new" component={NewCard}/>
        <Route path="edit/:id" component={EditCard}/>
    </Route>
)
