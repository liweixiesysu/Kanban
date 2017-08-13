import React from 'react';
import CardForm from './CardForm';
import CardActionCreator from '../actions/CardActionCreator';
import {Container} from 'flux/utils';
import DraftStore from '../stores/DraftStore';
import WebSocketStore from '../stores/WebSocketStore';

class NewCard extends React.Component {
    componentWillMount() {
        CardActionCreator.createDraft();
    }

    handleChange(field, value) {
        CardActionCreator.updateDraft(field, value);
    }

    handleSubmit() {
        let websocket = this.state.websocket;
        if (websocket) {
            websocket.send(JSON.stringify({
                action: 'addCard',
                card: this.state.card
            }));
        }

        CardActionCreator.addCard(this.state.card);
        this.props.history.pushState(null, '/');
    }

    handleClose() {
        this.props.history.pushState(null, '/');
    }

    render() {
        return <CardForm default={this.state} callbacks={
            {
                handleChange: this.handleChange.bind(this),
                handleSubmit: this.handleSubmit.bind(this),
                handleClose: this.handleClose.bind(this)
        }}/>
    }
}

NewCard.getStores = () => {
    return [DraftStore, WebSocketStore];
}

NewCard.calculateState = (prevState) => {
    return {
        card: DraftStore.getState(),
        websocket: WebSocketStore.getState().websocket
    };
}

export default Container.create(NewCard);
