import { createStore, applyMiddleware, compose } from "redux";
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers/indexReducer';


export default createStore(
    rootReducer, 
    {}, 
    applyMiddleware(thunk, createLogger)
);