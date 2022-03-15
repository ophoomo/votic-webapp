import { AuthActionInterface, AuthActionType } from "../types/authType";


export const setID = (id : string) : AuthActionInterface => {
    return {
        type: AuthActionType.SET_ID,
        payload: id
    };
}

export const setExpire = (time : number) : AuthActionInterface => {
    return {
        type: AuthActionType.SET_EXPIRE,
        payload: time
    };
}

export const setName = (name : string) : AuthActionInterface => {
    return {
        type: AuthActionType.SET_NAME,
        payload: name
    };
}

export const setGroup = (group : string) : AuthActionInterface => {
    return {
        type: AuthActionType.SET_GROUP,
        payload: group
    };
}