import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { config } from "./config";
import { initialState, reducer } from "./dataLayer/Reducer";
import { StateProvider } from "./dataLayer/StateProvider";

const client = new ApolloClient({
    uri: config.apiBaseUrl,
    cache: new InMemoryCache()
});

ReactDOM.render(
    <React.StrictMode>
        <StateProvider reducer={reducer} initialState={initialState}>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </StateProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
