
export interface AuthState {
    id: string
    expire: number
    name: string
    gender: string
    group: Array<string>
}

export enum AuthActionType {
    SET_ID = "SET_ID",
    SET_EXPIRE = "SET_EXPIRE",
    SET_NAME = "SET_NAME",
    SET_GROUP = "SET_GROUP",
    SET_GENDER = "SET_GENDER"
}

export type AuthAction = AuthActionType;

export interface AuthActionInterface {
    type: AuthAction,
    payload: any
}

