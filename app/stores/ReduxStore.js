import {createStore} from 'redux';
import reducer from '../reducers/reducer';

const store = createStore(reducer, { cards: [], websocket: null, draft: null});
export default store;
