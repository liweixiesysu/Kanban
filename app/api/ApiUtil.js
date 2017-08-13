export default {
    createWebSocket() {
        return new Promise((resolve, reject) => {
            let websocket = new WebSocket(`ws://${location.host}`);
            resolve(websocket);
        });
    },

    /**
     * 获取任务信息
     * @return {Promise.<TResult>}
     */
    fetchCards() {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open('Get', 'data.json', true);

            let timer = setTimeout(() => {
                xhr.abort();
                reject("Query is time out");
            }, 5000);

            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4)
                {
                    clearTimeout(timer);
                    if (xhr.status === 200) {
                        resolve(xhr.responseText);
                        return;
                    }

                    reject(xhr.status);
                }
            }

            xhr.send();
        })
            .then((data) => {
                try {
                    return JSON.parse(data);
                }
                catch (ex) {
                    throw ex;
                }
            });
    }
}
