import React from 'react';
import CardForm from './CardForm';
import {connect} from 'react-redux';
import Constants from '../Constants';

class NewCard extends React.Component {
    componentWillMount() {
        this.props.createDraft();
    }

    handleChange(field, value) {
        this.props.updateDraft(field, value);
    }

    handleSubmit() {
        let websocket = this.props.websocket;
        if (websocket) {
            websocket.send(JSON.stringify({
                action: 'addCard',
                card: this.props.card
            }));
        }

        this.props.addCard(this.props.card);
        this.props.history.pushState(null, '/');
    }

    handleClose() {
        this.props.history.pushState(null, '/');
    }

    render() {
        return <CardForm default={this.props.card} callbacks={
            {
                handleChange: this.handleChange.bind(this),
                handleSubmit: this.handleSubmit.bind(this),
                handleClose: this.handleClose.bind(this)
        }}/>
    }
}

function mapStateToProps(state, ownProps) {
    return {
        card: state.draft || {title: '', description: '', status: 'to-do'},
        websocket: state.websocket
    };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        createDraft: () => {
            dispatch({
                type: Constants.CARETE_DRAFT
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
        addCard: (card) => {
            dispatch({
                type: Constants.ADD_CARD,
                payload: card
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
