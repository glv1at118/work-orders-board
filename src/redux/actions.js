import axios from 'axios';

export function makeRequest() {
    return function (dispatch, getState) {
        let workerIdArr = [];
        axios.get("https://www.hatchways.io/api/assessment/work_orders")
            .then(function (response) {
                dispatch(updateOrders(response.data.orders));
                for (let x = 0; x < getState().orders.length; x++) {
                    let workerId = getState().orders[x].workerId;
                    if (!workerIdArr.includes(workerId)) {
                        workerIdArr.push(workerId);
                    }
                }
                for (let y = 0; y < workerIdArr.length; y++) {
                    axios.get(`https://www.hatchways.io/api/assessment/workers/${workerIdArr[y]}`)
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