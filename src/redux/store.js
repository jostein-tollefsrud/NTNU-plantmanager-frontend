import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import { getUserDetailsReducer, getUsersReducer, userDeleteReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducers';
import { getPlantDetailsReducer, getPlantsReducer, plantCreateReducer, plantDeleteReducer, plantFertilizeReducer, plantUpdateReducer, plantWaterReducer } from './reducers/plantReducers';

const initialState = {
    userLogin: {
        userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    }
}

const reducer = combineReducers({
    getUsers: getUsersReducer,
    getUserDetails: getUserDetailsReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userUpdate: userUpdateReducer,
    userUpdateProfile: userUpdateProfileReducer,
    deleteUser: userDeleteReducer,
    // Plant reducers
    getPlants: getPlantsReducer,
    getPlantDetails: getPlantDetailsReducer,
    plantCreate: plantCreateReducer,
    plantUpdate: plantUpdateReducer,
    plantDelete: plantDeleteReducer,
    plantWater: plantWaterReducer,
    plantFertilize: plantFertilizeReducer
});

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;