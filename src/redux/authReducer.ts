export type AuthState = {
    isAuthenticated: boolean;
    username: string;
    accessToken: string;
    refreshToken: string;
}

const initialState: AuthState = {
    isAuthenticated: false,
    username: '',
    accessToken: '',
    refreshToken: ''
}
export type AuthAction = {
    type: string;
    payload?: AuthState
}
//login{type:"login",payload:{isAuthenticated:true ...}}
//logout{type:"logout"}
export const authReducer = (state: AuthState = initialState, action: AuthAction) => {
    if (action.type === "login" && action.payload) {
        return action.payload;
    }
    else if (action.type === "logout") {
        return initialState;
    }
    return state;
}