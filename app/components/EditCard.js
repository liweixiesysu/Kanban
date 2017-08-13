import React from 'react';
import CardForm from './CardForm';
import CardActionCreator from '../actions/CardActionCreator';
import {Container} from 'flux/utils';
import DraftStore from '../stores/DraftStore';
import WebSocketStore from '../stores/WebSocketStore';

class EditCard extends React.Component {
    componentWillMount() {
        if (this.props.initialData) {
            return;
        }

        let initialData = document.body.querySelector('#initialData');
        if (initialData && initialData.textContent) {
            CardActionCreator.initAppContainer(JSON.parse(initialData.textContent));
        }

        console.log(this.props.params.id)
        CardActionCreator.createDraft(parseInt(this.props.params.id));
    }

    handleChange(field, value) {
        CardActionCreator.updateDraft(field, value);
    }

    handleClose() {
        this.props.history.pushState(null, '/');
    }

    handleSubmit() {
        let websocket = this.state.websocket;
        if (websocket) {
            websocket.send(JSON.stringify({
                action: 'editCard',
                card: this.state.card
            }))
        }

        CardActionCreator.updateCard(this.state.card);
        this.props.history.pushState(null,'/');
    }

    render() {
        let card = this.state.card;
        if (this.props.initialData) {
            let cardIdx = this.props.initialData.findIndex(e => e.id === parseInt(this.props.params.id));
            card = this.props.initialData[cardIdx];
        }

        return <CardForm default={card} callbacks={
            {
                handleChange: this.handleChange.bind(this),
                handleClose: this.handleClose.bind(this),
                handleSubmit: this.handleSubmit.bind(this)
            }
        }/>
    }
}

EditCard.requestInitialData = () => {

}

EditCard.getStores = () => {
    return [DraftStore, WebSocketStore];
}

EditCard.calculateState = (prevState) => {
    return {
        card: DraftStore.getState(),
        websocket: WebSocketStore.getState().websocket
    }
}

export default Container.create(EditCard);