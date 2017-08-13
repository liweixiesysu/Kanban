import AppDispatcher from '../AppDispatcher';
import Constants from '../Constants';

export default {
    addTask(cardId, taskName) {
        AppDispatcher.dispatch({
            type: Constants.ADD_TASK,
            payload: {
                cardId: cardId,
                taskName: taskName
            }
        });
    },

    deleteTask(cardId, taskId) {
        AppDispatcher.dispatch({
            type: Constants.DELETE_TASK,
            payload: {
                cardId: cardId,
                taskName: taskId
            }
        });
    }
}
