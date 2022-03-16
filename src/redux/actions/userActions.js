import * as actionTypes from '../constants/userConstants';
import axios from 'axios';

const PLANT_API = 'https://ntnu-plantmanager.herokuapp.com';

const userInfo = JSON.parse(localStorage.getItem('userInfo'));

let token = undefined;

if (userInfo) {
  token = userInfo.token;
}

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_USERS_REQUEST });

    const { data } = await axios.get(`${PLANT_API}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: actionTypes.GET_USERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();
  dispatch({ type: actionTypes.GET_USER_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`${PLANT_API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    dispatch({
      type: actionTypes.GET_USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeUserDetails = () => (dispatch) => {
  dispatch({
    type: actionTypes.GET_USER_DETAILS_RESET,
  });
};

// Login
export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_LOGIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post(`${PLANT_API}/login`, {
      email,
      password,
    });
    dispatch({
      type: actionTypes.USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
    token = data.token;
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('notify');
  localStorage.removeItem('notified');
  dispatch({ type: actionTypes.USER_LOGIN_SIGNOUT });
};

export const register =
  (firstName, lastName, email, password) => async (dispatch) => {
    dispatch({
      type: actionTypes.USER_REGISTER_REQUEST,
      payload: { email, password },
    });
    try {
      const { data } = await axios.post(
        `${PLANT_API}/register`,
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: actionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      });
      // to update state
      // dispatch({
      //     type: actionTypes.USER_LOGIN_SUCCESS,
      //     payload: data,
      // });
      // localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: actionTypes.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUser =
  (firstName, lastName, email, role, id) => async (dispatch) => {
    dispatch({
      type: actionTypes.USER_UPDATE_REQUEST,
    });
    try {
      const { data } = await axios.put(
        `${PLANT_API}/users/${id}`,
        {
          firstName,
          lastName,
          email,
          role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: actionTypes.USER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateUserProfile =
  (firstName, lastName, id) => async (dispatch) => {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
    });
    try {
      const { data } = await axios.put(
        `${PLANT_API}/users/${id}`,
        {
          firstName,
          lastName,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const userDelete = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_DELETE_REQUEST,
    payload: id,
  });
  try {
    const { data } = await axios.delete(`${PLANT_API}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({
      type: actionTypes.USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
