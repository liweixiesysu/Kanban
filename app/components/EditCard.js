import React from 'react';
import CardForm from './CardForm';
import {connect} from 'react-redux';
import Constants from '../Constants';

class EditCard extends React.Component {
    componentWillMount() {
        if (this.props.initialData) {
            return;
        }

        let initialData = document.body.querySelector('#initialData');
        if (initialData && initialData.textContent) {
            this.props.initAppContainer(JSON.parse(initialData.textContent));
        }

        console.log(this.props.params.id)
        this.props.createDraft(parseInt(this.props.params.id));
    }

    handleChange(field, value) {
        this.props.updateDraft(field, value);
    }

    handleClose() {
        this.props.history.pushState(null, '/');
    }

    handleSubmit() {
        let websocket = this.props.websocket;
        if (websocket) {
            websocket.send(JSON.stringify({
                action: 'editCard',
                card: this.props.card
            }))
        }

        this.props.updateCard(this.props.card);
        this.props.history.pushState(null,'/');
    }

    render() {
        let card = this.props.card;
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

function mapStateToProps(state, ownProps) {
    let cardIdx = state.cards.findIndex(e => e.id === parseInt(ownProps.params.id));
    return {
        card: state.draft || state.cards[cardIdx],
        websocket: state.websocket
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
      initAppContainer: (cards) => {
          dispatch({
              type: Constants.APP_CONTAINER_INIT,
              payload: cards
          });
      },
        createDraft: (cardId) => {
          dispatch({
              type: Constants.CARETE_DRAFT,
              payload: cardId
          });
        },
        updateDraft: (field, value) => {
          dispatch({
              type: Constants.UPDATE_DRAFT,
              payload: {
                  field: field,
                  value: value
              }
          });
        },
        updateCard: (card) => {
          dispatch({
              type: Constants.UPDATE_CARD,
              payload: card
          });
        }
    };
}

EditCard.requestInitialData = () => {

}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard);