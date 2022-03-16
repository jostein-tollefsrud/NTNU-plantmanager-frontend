import * as actionTypes from '../constants/plantConstants';
import axios from 'axios';
require('dotenv').config();

//const userInfo = JSON.parse(localStorage.getItem('userInfo'));

let token = undefined;

const { PLANT_API } = process.env;

/*if (userInfo) {
    token = userInfo.token;
}*/

export const getPlants = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PLANT_REQUEST });

    const { data } = await axios.get(`${PLANT_API}/plants`);

    dispatch({
      type: actionTypes.GET_PLANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PLANT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPlantDetails = (id) => async (dispatch) => {
  dispatch({ type: actionTypes.GET_PLANT_DETAILS_REQUEST });
  try {
    const { data } = await axios.get(`${PLANT_API}/plants/${id}`);

    dispatch({
      type: actionTypes.GET_PLANT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PLANT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createPlant =
  (name, location, waterFrequency, fertilizingFrequency, light) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.PLANT_CREATE_REQUEST,
      payload: {
        name,
        location,
        waterFrequency,
        fertilizingFrequency,
        light,
      },
    });
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const { data } = await axios.post(
        `${PLANT_API}/register`,
        {
          name,
          location,
          waterFrequency,
          fertilizingFrequency,
          light,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: actionTypes.PLANT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PLANT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updatePlant =
  (
    name,
    plantType,
    location,
    waterFrequency,
    fertilizingFrequency,
    light,
    id
  ) =>
  async (dispatch) => {
    dispatch({
      type: actionTypes.PLANT_UPDATE_REQUEST,
    });
    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));

      const { data } = await axios.put(
        `${PLANT_API}/plant/${id}`,
        {
          name,
          plantType,
          location,
          waterFrequency,
          fertilizingFrequency,
          light,
        },
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: actionTypes.PLANT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PLANT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const plantDelete = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.PLANT_DELETE_REQUEST,
    payload: id,
  });
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const { data } = await axios.delete(`${PLANT_API}/plants/${id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: actionTypes.PLANT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PLANT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const waterPlant = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.PLANT_WATER_REQUEST,
  });
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const { data } = await axios.put(
      `${PLANT_API}/plant/water/${id}`,
      {
        id,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: actionTypes.PLANT_WATER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PLANT_WATER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fertilizePlant = (id) => async (dispatch) => {
  dispatch({
    type: actionTypes.PLANT_FERTILIZE_REQUEST,
  });
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const { data } = await axios.put(
      `${PLANT_API}/plant/fertilize/${id}`,
      {
        id,
      },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({
      type: actionTypes.PLANT_FERTILIZE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PLANT_FERTILIZE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
