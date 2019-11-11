import initialState from './state.js';

function myReducer(previousState = initialState, action) {
    let nextState = {
        orders: [...previousState.orders],
        workers: { ...previousState.workers },
        nameQuery: previousState.nameQuery,
        timeQuery: previousState.timeQuery
    };
    switch (action.type) {
        case "UPDATE_ORDERS":
            nextState.orders = action.orders;
            return nextState;
        case "UPDATE_WORKERS":
            nextState.workers[`worker${action.worker.id}`] = action.worker;
            return nextState;
        case "UPDATE_NAME_QUERY":
            nextState.nameQuery = action.newName;
            return nextState;
        case "UPDATE_TIME_QUERY":
            nextState.timeQuery = action.newTime;
            return nextState;
        default:
            return previousState;
    }
}

export default myReducer;