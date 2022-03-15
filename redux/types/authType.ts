
export interface AuthState {
    id: string
    expire: number
    name: string
    group: Array<string>
}

export enum AuthActionType {
    SET_ID = "SET_ID",
    SET_EXPIRE = "SET_EXPIRE",
    SET_NAME = "SET_NAME",
    SET_GROUP = "SET_GROUP"
}

export type AuthAction = AuthActionType;

export interface AuthActionInterface {
    type: AuthAction,
    payload: any
}

