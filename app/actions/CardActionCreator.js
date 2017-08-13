import AppDispatcher from '../AppDispatcher';
import ApiUtil from '../api/ApiUtil';
import Constants from '../Constants';
import Utils from '../Utils';

export default {
    createWebSocket() {
        AppDispatcher.dispatchAsync(ApiUtil.createWebSocket(), {
            start: Constants.CREATE_WEBSOCKET,
            success: Constants.CREATE_WEBSOCKET,
            error: Constants.CREATE_WEBSOCKET
        });
    },

    fetchCards() {
        AppDispatcher.dispatchAsync(ApiUtil.fetchCards(), {
            start: Constants.FETCH_CARD,
            success: Constants.FETCH_CARD_SUCCESS,
            error: Constants.FETCH_CARD_ERROR
        });
    },

    updateCardStatus: Utils.throttle(function(cardId, newStatus) {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_CARD_STATUS,
            payload: {
                cardId: cardId,
                newStatus: newStatus
            }
        })
    }, 500),

    updateCardPosition: Utils.throttle(function(cardId, dropCardId) {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_CARD_POSITION,
            payload: {
                cardId: cardId,
                dropCardId: dropCardId
            }
        })
    }, 500),

    addCard(newCard) {
        AppDispatcher.dispatch({
            type: Constants.ADD_CARD,
            payload: newCard
        })
    },

    createDraft(cardId) {
        AppDispatcher.dispatch({
            type: Constants.CARETE_DRAFT,
            payload: cardId

        })
    },

    updateDraft(field, value) {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_DRAFT,
            payload: {
                field: field,
                value: value
            }
        })
    },

    updateCard(newCard) {
        AppDispatcher.dispatch({
            type: Constants.UPDATE_CARD,
            payload: newCard
        })
    },

    initAppContainer(initialData) {
        AppDispatcher.dispatch({
            type: Constants.APP_CONTATINER_INIT,
            payload: initialData
        });
    }
}
