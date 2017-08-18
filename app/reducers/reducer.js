import update from 'react-addons-update';
import Constants from '../Constants';

function updateWebSocket(state, action) {
    return update(state, {
        websocket: {
            $set: action.payload
    }});
}

function updateCard(state, action) {
    let cardIdx = state.cards.findIndex(e => e.id === action.payload.id);
    return update(state, {
        cards: {
            [cardIdx]: {
                $set: action.payload
            }
        }
    });
}

function updateCardPosition(state, action) {
    let cardId = action.payload.cardId;
    let dropCardId = action.payload.dropCardId;
    if (cardId === dropCardId) {
        return state;
    }

    let cardIdx = state.cards.findIndex(e => e.id === cardId);
    let card = state.cards[cardIdx];

    let newPos = state.cards.findIndex(e => e.id === dropCardId);
    return update(state, {
        cards: {
            $splice: [[cardIdx, 1], [newPos, 0, card]]
        }
    });
}

function updateCardStatus(state, action) {
    let cardIdx = state.cards.findIndex(e => e.id === action.payload.cardId);
    let card = state.cards[cardIdx];
    if (card.status === action.payload.newStatus) {
        return state;
    }

    return update(state, {
        cards: {
            [cardIdx]: {
                status: {
                    $set: action.payload.newStatus
                }
            }
        }
    });
}

function addTask(state, action) {
    let cardIdx = state.cards.findIndex(e => e.id === action.payload.cardId);
    return update(state, {
        cards: {
            [cardIdx]: {
                tasks: {
                    $push: [{
                        id: Date.now(),
                        taskName: action.payload.taskName
                    }]
                }
            }
        }
    });
}

function deleteTask(state, action) {
    let cardIdx = state.cards.findIndex(e => e.id === action.payload.cardId);
    let taskIdx = state.cards[cardIdx].tasks.findIndex(e => e.id === action.payload.taskId);
    return update(state, {
        cards: {
            [cardIdx]: {
                tasks: {
                    $splice: [[taskIdx, 1]]
                }
            }
        }
    });
}

function fetchCard(state, action) {
    return update(state, {
        cards: {
            $set: action.payload
        }
    });
}

function initApp(state, action) {
    return update(state, {
        cards: {
            $set: action.payload
        }
    });
}

function updateDraft(state, action) {
    return update(state, {
        draft: {
            [action.payload.field]: {
                $set: action.payload.value
            }
        }
    });
}

function createDraft(state, action) {
    let cardId = action.payload;
    if (!cardId && (cardId !== 0)) {
        return update(state, {
            draft: {
                $set: {
                    id: Date.now(),
                    title: '',
                    description: '',
                    status: 'to-do'
                }
            }
        });
    }

    let cardIdx = state.cards.findIndex(e => e.id === cardId);
    let card = state.cards[cardIdx];
    return update(state, {
        draft: {
            $set: card
        }
    });
}

function addCard(state, action) {
    return update(state, {
        cards: {
            $push: [action.payload]
        }
    });
}

export default (state, action) => {
    switch (action.type) {
        case Constants.CREATE_WEBSOCKET:
            return updateWebSocket(state, action);
        case Constants.UPDATE_CARD:
            return updateCard(state, action);
        case Constants.ADD_CARD:
            return addCard(state, action);
        case Constants.UPDATE_CARD_POSITION:
            return updateCardPosition(state, action);
        case Constants.UPDATE_CARD_STATUS:
            return updateCardStatus(state, action);
        case Constants.ADD_TASK:
            return addTask(state, action);
        case Constants.DELETE_TASK:
            return deleteTask(state, action);
        case Constants.FETCH_CARD_SUCCESS:
            return fetchCard(state, action);
        case Constants.UPDATE_DRAFT:
            return updateDraft(state, action);
        case Constants.CARETE_DRAFT:
            return createDraft(state, action);
        case Constants.APP_CONTAINER_INIT:
            return initApp(state, action);
        default:
            return state;
    }
}
