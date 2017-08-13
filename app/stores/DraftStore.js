import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';
import CardStore from './CardStore';
import update from 'react-addons-update';

class DraftStore extends ReduceStore {
    getInitialState() {
        return {
            id: Date.now(),
            title: '',
            description: '',
            status: 'to-do'
        };
    }

    updateDraft(field, value) {
        let newState = update(this.getState(), {[field]: {$set: value}});
        return newState;
    }

    createDraft(cardId) {
        if (!cardId && (cardId !== 0)) {
            return {
                id: Date.now(),
                title: '',
                description: '',
                status: 'to-do'
            }
        }

        let cardIdx = CardStore.getState().findIndex(e => e.id === cardId);
        return CardStore.getState()[cardIdx];
    }

    reduce(state, action) {
        switch (action.type) {
            case Constants.UPDATE_DRAFT:
                return this.updateDraft(action.payload.field, action.payload.value);
            case Constants.CARETE_DRAFT:
                return this.createDraft(action.payload);
            default:
                return state;
        }
    }
}

export default new DraftStore(AppDispatcher)