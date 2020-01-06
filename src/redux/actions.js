import axios from 'axios';

export function makeRequest() {
    return function (dispatch, getState) {
        let workerIdArr = [];
        axios.get("https://raw.githubusercontent.com/glv1at118/work-system-api/master/work_orders.json")
            .then(function (response) {
                dispatch(updateOrders(response.data.orders));
                for (let x = 0; x < getState().orders.length; x++) {
                    let workerId = getState().orders[x].workerId;
                    if (!workerIdArr.includes(workerId)) {
                        workerIdArr.push(workerId);
                    }
                }
                for (let y = 0; y < workerIdArr.length; y++) {
                    axios.get(`https://raw.githubusercontent.com/glv1at118/work-system-api/master/${workerIdArr[y]}.json`)
                        .then(function (response) {
                            dispatch(updateWorkers(response.data.worker));
                        }
                        ).catch(function (error) {
                            console.log(error);
                        })
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        // Instead of the above ways, I can also use an object, with the worker's id as the object's keys, and the corresponding worker data as the value. Also use if statement, if there's already such an id, then it means there's already a worker value for it, in this case http request will not be made. If there's no such id, then add that id and make corresponding http request for the worker data. This can be more efficient.
    }
}

export function updateOrders(orders) {
    return {
        type: "UPDATE_ORDERS",
        orders: orders
    };
}

export function updateWorkers(worker) {
    return {
        type: "UPDATE_WORKERS",
        worker: worker
    }
}

export function updateNameQuery(newName) {
    return {
        type: "UPDATE_NAME_QUERY",
        newName: newName
    }
}

export function updateTimeQuery(newTime) {
    return {
        type: "UPDATE_TIME_QUERY",
        newTime: newTime
    }
}