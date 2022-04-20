
import {  AuthActionInterface, AuthActionType, AuthState } from '../types/authType';

const initialState = {
    id: '',
    expire: 0,
    name: '',
    gender: '',
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
        case AuthActionType.SET_GENDER:
            return {
                ...state, gender: action.payload
            };
        case AuthActionType.SET_GROUP:
            return {
                ...state, group: action.payload
            };
        default:
            return state;
    }
    
}