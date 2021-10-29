import React, { createContext, useReducer } from "react";
import Reducer from './reducers/AddPostReducer.js'


const initialState = {
    posts: [],
    error: null
};

const Store = ({ children }) => {
    //Hooked a reducer function with initialstate to access the store to manage the state.
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

//Creating store with initial state.
export const Context = createContext(initialState);
export default Store;