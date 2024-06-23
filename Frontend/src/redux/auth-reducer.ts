import { authAPI } from "../assets/images/api/api";

// Define action types
const SET_USER_DATA = 'SET_USER_DATA';
const LOGIN_ERROR = 'LOGIN_ERROR';
const REGISTER_ERROR = 'REGISTER_ERROR';

// Define state type
export interface AuthState {
    userId: number | null;
    email: string | null;
    login: string | null;
    isAuth: boolean;
    error: string | null;
}

// Initial state
const initialState: AuthState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    error: null
};

// Actions
interface SetAuthUserDataAction {
    type: typeof SET_USER_DATA;
    payload: {
        userId: number | null;
        email: string | null;
        login: string | null;
        isAuth: boolean;
    };
}

interface LoginErrorAction {
    type: typeof LOGIN_ERROR;
    error: string;
}

interface RegisterErrorAction {
    type: typeof REGISTER_ERROR;
    error: string;
}

type AuthActionTypes = SetAuthUserDataAction | LoginErrorAction | RegisterErrorAction;

// Reducer
const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                isAuth: true,
                error: null
            };
        case LOGIN_ERROR:
        case REGISTER_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

// Action creators
export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataAction => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth }
});

export const login = (email: string, password: string) => async (dispatch: any) => {
    try {
        let response = await authAPI.login(email, password);
        if (response && response.data) {
            const { userId } = response.data;
            dispatch(setAuthUserData(userId, email, email, true));
        } else {
            dispatch({ type: LOGIN_ERROR, error: 'Ошибка: данные пользователя не получены' });
        }
    } catch (error) {
        dispatch({ type: LOGIN_ERROR, error: error.response?.data?.message || 'Произошла ошибка при входе пользователя' });
    }
};

export const register = (username: string, email: string, password: string) => async (dispatch: any) => {
    try {
        let response = await authAPI.register(username, email, password);
        if (response && response.data) {
            const { userId } = response.data;
            dispatch(setAuthUserData(userId, email, email, true));
        } else {
            dispatch({ type: REGISTER_ERROR, error: 'Ошибка: данные пользователя не получены' });
        }
    } catch (error) {
        dispatch({ type: REGISTER_ERROR, error: error.response?.data?.message || 'Произошла ошибка при регистрации пользователя' });
    }
};

export default authReducer;
