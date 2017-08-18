import React from 'react';
import App from './components/App';
import {connect} from 'react-redux';
import Constants from './Constants';
import ApiUtil from './api/ApiUtil';

class AppContainer extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        this.props.createWebSocket();

        let initialData = document.body.querySelector('#initialData');
        if (initialData && initialData.textContent) {
            this.props.initAppContainer(JSON.parse(initialData.textContent));
            return;
        }

        this.props.fetchCards();
    }

    render() {
        return (
            <App cards={this.props.initialData ? this.props.initialData : this.props.cards} callbacks={
                {
                }
            } children={this.props.children}/>
        )
    }
}

AppContainer.requestInitialData = () => {
}

function mapStateToProps(state, ownProps) {
    return {
        cards: state.cards
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
        fecthCards: () => {
            ApiUtil.fetchCards().then((data) => {
                dispatch({
                    type: Constants.FETCH_CARD_SUCCESS,
                    payload: data
                });
            }).catch((error) => {
                dispatch({
                    type: Constants.FETCH_CARD_ERROR,
                    payload: error
                });
            });
        },
        createWebSocket: () => {
            ApiUtil.createWebSocket().then((data) => {
                dispatch({
                    type: Constants.CREATE_WEBSOCKET,
                    payload: data
                });
            }).catch((error) => {
                console.log('Failed to create websocket!');
                console.log(error);
            });
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
