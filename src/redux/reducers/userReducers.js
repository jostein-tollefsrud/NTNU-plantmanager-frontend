import * as actionTypes from '../constants/userConstants';

export const getUsersReducer = (state = { users: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
                users: []
            }
        case actionTypes.GET_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload
            }
        case actionTypes.GET_USERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }   
};

export const getUserDetailsReducer = (state = { user: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_USER_DETAILS_REQUEST:
            return {
                ...state, loading: true,
            }
        case actionTypes.GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case actionTypes.GET_USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_USER_DETAILS_RESET:
            return {
                ...state,
                user: {}
            }
        default:
            return state
    }
};

export const userLoginReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.USER_LOGIN_REQUEST:
            return { loading: true }
        case actionTypes.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case actionTypes.USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.USER_LOGIN_SIGNOUT:
            return {}
        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.USER_REGISTER_REQUEST:
            return { ...state, loading: true }
        case actionTypes.USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, success: true }
        case actionTypes.USER_REGISTER_FAIL:
            return { ...state, loading: false, error: action.payload }
        case actionTypes.USER_REGISTER_RESET:
            return {}
        default:
            return state
    }
}

export const userUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.USER_UPDATE_REQUEST:
            return { loading: true }
        case actionTypes.USER_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case actionTypes.USER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.USER_UPDATE_RESET:
            return {};
        default:
            return state
    }
}

export const userUpdateProfileReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.USER_UPDATE_PROFILE_REQUEST:
            return { loading: true }
        case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case actionTypes.USER_UPDATE_PROFILE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.USER_UPDATE_PROFILE_RESET:
            return {};
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.USER_DELETE_REQUEST:
            return { loading: true }
        case actionTypes.USER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case actionTypes.USER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.USER_DELETE_RESET:
            return {};
        default:
            return state
    }
}