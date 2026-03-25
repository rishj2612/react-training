import { authReducer } from './authReducer';
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { gadgetsReducer } from './GadgetsReducer';


const reducer = combineReducers({
    auth: authReducer,
    gadget: gadgetsReducer
});

export const store = configureStore({
    reducer
    , devTools: true
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispath = typeof store.dispatch;