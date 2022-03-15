import {  RootState } from './store';

export const getAuthState = (state : RootState ) => {
    return state.authReducer;
}