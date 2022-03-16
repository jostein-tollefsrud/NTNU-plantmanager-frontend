import * as actionTypes from '../constants/plantConstants';

export const getPlantsReducer = (state = { plants: [] }, action) => {
    switch(action.type) {
        case actionTypes.GET_PLANT_REQUEST:
            return {
                loading: true,
                plants: []
            }
        case actionTypes.GET_PLANT_SUCCESS:
            return {
                loading: false,
                plants: action.payload
            }
        case actionTypes.GET_PLANT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }   
};

export const getPlantDetailsReducer = (state = { plant: {} }, action) => {
    switch(action.type) {
        case actionTypes.GET_PLANT_DETAILS_REQUEST:
            return {
                ...state, loading: true,
            }
        case actionTypes.GET_PLANT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                plant: action.payload
            }
        case actionTypes.GET_PLANT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case actionTypes.GET_PLANT_DETAILS_RESET:
            return {
                ...state,
                plant: {}
            }
        default:
            return state
    }
};

export const plantCreateReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_CREATE_REQUEST:
            return { ...state, loading: true }
        case actionTypes.PLANT_CREATE_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload, success: true }
        case actionTypes.PLANT_CREATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        case actionTypes.PLANT_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const plantUpdateReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_UPDATE_REQUEST:
            return { loading: true }
        case actionTypes.PLANT_UPDATE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case actionTypes.PLANT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PLANT_UPDATE_RESET:
            return {};
        default:
            return state
    }
}

export const plantDeleteReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_DELETE_REQUEST:
            return { loading: true }
        case actionTypes.PLANT_DELETE_SUCCESS:
            return { loading: false, success: true }
        case actionTypes.PLANT_DELETE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PLANT_DELETE_RESET:
            return {};
        default:
            return state
    }
}

export const plantWaterReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_WATER_REQUEST:
            return { loading: true }
        case actionTypes.PLANT_WATER_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case actionTypes.PLANT_WATER_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PLANT_WATER_RESET:
            return {};
        default:
            return state
    }
}

export const plantFertilizeReducer = (state = {}, action) => {
    switch(action.type) {
        case actionTypes.PLANT_FERTILIZE_REQUEST:
            return { loading: true }
        case actionTypes.PLANT_FERTILIZE_SUCCESS:
            return { loading: false, userInfo: action.payload, success: true }
        case actionTypes.PLANT_FERTILIZE_FAIL:
            return { loading: false, error: action.payload }
        case actionTypes.PLANT_FERTILIZE_RESET:
            return {};
        default:
            return state
    }
}