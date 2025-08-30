export default function logger(reducer) {
    return (state, action, args) => {
        console.group(action);
        console.log('Prev State: ', state);
        console.log('Action: ', action);
        console.log('Action Arguments: ', args);
        const nextSate = reducer(state, action, args);
        console.log('Next State: ', nextSate);
        console.groupEnd();
        return nextSate;
    };
}
