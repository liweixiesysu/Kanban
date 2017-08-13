import {ReduceStore} from 'flux/utils';
import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';

class WebSocketStore extends ReduceStore {
    getInitialState() {
        return {websocket: null};
    }

    reduce(state, action) {
        if (action.type === Constants.CREATE_WEBSOCKET) {
            return {websocket: action.payload};
        }

        return state;
    }
}

export default new WebSocketStore(AppDispatcher);