import { createStore } from 'redux';

const initialState = {
    message: "Hello",
    count: 5
}

//reducer
const reducer = (state = initialState, action) => {
    if (action.type === "increment_ctr") {
        return ({ ...state, count: state.count + 1 });
    } else if (action.type === "update_ctr") {
        return { ...state, count: action.ctr };
    }
    //return the updated state
    return state;
}

//store
const store = createStore(reducer);

store.subscribe(()=>{
    console.log("State: ", store.getState());
})
store.dispatch({ type: "increment_ctr" });

store.dispatch({ type: "update_ctr", ctr: 10 });
