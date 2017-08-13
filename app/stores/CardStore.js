import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';
import update from 'react-addons-update';

class CardStore extends ReduceStore {
    getInitialState() {
        return [];
    }

    addTask(cardId, taskName) {
        let cardIdx = this.getState().findIndex(e => e.id === cardId);
        let newState = update(this.getState(), {
            [cardIdx]: {
                tasks: {
                    $push: [{
                        id: Date.now(),
                        taskName: taskName
                    }]
                }
            }
        });

        return newState;
    }

    deleteTask(cardId, taskId) {
        let cardIdx = this.getState().findIndex(e => e.id === cardId);
        let taskIdx = this.getState()[cardIdx].tasks.findIndex(e => e.id === taskId);
        let newState = update(this.getState(), {
            [cardIdx]: {
                tasks: {
                    $splice: [[taskIdx, 1]]
                }
            }
        });

        return newState;
    }

    updateCardStatus(cardId, newStatus) {
        let cardIdx = this.getState().findIndex(e => e.id === cardId);
        let card = this.getState()[cardIdx];
        if (card.status === newStatus) {
            return this.getState();
        }

        let newState = update(this.getState(), {
            [cardIdx]: {
                status: {
                    $set: newStatus
                }
            }
        });

        return newState;
    }

    updateCardPosition(cardId, dropCardId) {
        let cardIdx = this.getState().findIndex(e => e.id === cardId);
        if (cardIdx === dropCardId) {
            return this.getState();
        }

        let newPos = this.getState().findIndex(e => e.id === dropCardId);
        let card = this.getState()[cardIdx];
        let newState = update(this.getState(), {
            $splice: [[cardIdx, 1], [newPos, 0, card]]
        });

        return newState;
    }

    addCard(newCard) {
        let newState = update(this.getState(), {$push: [newCard]});
        return newState;
    }

    updateCard(newCard) {
        let cardIdx = this.getState().findIndex(e => e.id === newCard.id);
        let newState = update(this.getState(), {[cardIdx]: {$set: newCard}});
        return newState;
    }

    reduce(state, action) {
        switch (action.type) {
            case Constants.APP_CONTATINER_INIT:
                return action.payload;
            case Constants.UPDATE_CARD:
                return this.updateCard(action.payload);
            case Constants.ADD_CARD:
                return this.addCard(action.payload);
            case Constants.UPDATE_CARD_POSITION:
                return this.updateCardPosition(action.payload.cardId, action.payload.dropCardId);
            case Constants.UPDATE_CARD_STATUS:
                return this.updateCardStatus(action.payload.cardId, action.payload.newStatus);
            case Constants.DELETE_TASK:
                return this.deleteTask(action.payload.cardId, action.payload.taskId);
            case Constants.FETCH_CARD_SUCCESS:
                return action.payload;
            case Constants.ADD_TASK:
                return this.addTask(action.payload.cardId, action.payload.taskName);
            default:
                return state;
        }
    }
}

export default new CardStore(AppDispatcher);

