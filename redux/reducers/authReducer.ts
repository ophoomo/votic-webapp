
import {  AuthActionInterface, AuthActionType, AuthState } from '../types/authType';

const initialState = {
    id: '',
    expire: 0,
    name: '',
    group: [],
};

export const authReducer = (state = initialState, action: AuthActionInterface) : AuthState => {
    switch (action.type) {
        case AuthActionType.SET_ID:
            return {
                ...state, id: action.payload
            };
        case AuthActionType.SET_EXPIRE:
            return {
                ...state, expire: action.payload
            };
        case AuthActionType.SET_NAME:
            return {
                ...state, name: action.payload
            };
        case AuthActionType.SET_GROUP:
            return {
                ...state, group: action.payload
            };
        default:
            return state;
    }
    
}