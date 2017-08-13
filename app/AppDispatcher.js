import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {
    dispatchAsync(promise, types) {
        let {start, success, error} = types;
        this.dispatch({
            type: start
        });

        promise.then((data) => {
            this.dispatch({
                type: success,
                payload: data
            })
        },
            (error) => {
            console.log(error);
                this.dispatch({
                    type: error
                });
            }
        );
    }
}

export default new AppDispatcher();
