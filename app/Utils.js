export default {
    throttle(func, timeout) {
        let lastInvokeTime;
        let lastArgs;
        return function() {
            let curArgs = JSON.stringify(arguments);
            if (lastArgs !== curArgs) {
                func.apply(null, arguments);
                lastInvokeTime = Date.now();
            }

            let timeDiff = Date.now() - lastInvokeTime;
            if (timeDiff <= timeout) {
                return;
            }

            func.apply(null, arguments);
            lastInvokeTime = Date.now();
        }
    }
}
