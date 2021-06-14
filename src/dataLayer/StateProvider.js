import React, { createContext, useContext, useReducer } from "react";

//creating the context...
export const StateContext = createContext();

// Pull information from the data layer
export const useStateValue = () => useContext(StateContext);

// Wrap our app and provide the Data layer
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);