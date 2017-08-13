import React from 'react';
import List from './List';
import {DragDropContext} from 'react-dnd';
import Html5Backend from 'react-dnd-html5-backend';
import NewCard from './NewCard';
import {Link} from 'react-router';

class App extends React.Component {
    render() {
        let newCard = this.props.children && React.cloneElement(this.props.children, {
            callbacks: this.props.callbacks,
            cards: this.props.cards
            });
        return (
            <div className="app">
                <Link to="new" className="add-card">+</Link>
                <List key="to-do" id="to-do" title="To-do" className="to-do"
                      cards={this.props.cards.filter(e => e.status === 'to-do')} callbacks={this.props.callbacks}/>
                <List key="doing" id="doing" title="Doing" className="doing"
                      cards={this.props.cards.filter(e => e.status === 'doing')} callbacks={this.props.callbacks}/>
                <List key="done" id="done" title="Done" className="done"
                      cards={this.props.cards.filter(e => e.status === 'done')} callbacks={this.props.callbacks}/>
                {newCard}
            </div>
        );
    }
}

export default DragDropContext(Html5Backend)(App);