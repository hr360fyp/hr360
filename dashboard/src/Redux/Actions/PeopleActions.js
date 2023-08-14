import {
  PEOPLE_CREATE_FAIL,
  PEOPLE_CREATE_REQUEST,
  PEOPLE_CREATE_SUCCESS,
  PEOPLE_DELETE_FAIL,
  PEOPLE_DELETE_REQUEST,
  PEOPLE_DELETE_SUCCESS,
  PEOPLE_EDIT_FAIL,
  PEOPLE_EDIT_REQUEST,
  PEOPLE_EDIT_SUCCESS,
  PEOPLE_LIST_FAIL,
  PEOPLE_LIST_REQUEST,
  PEOPLE_LIST_SUCCESS,
  PEOPLE_UPDATE_FAIL,
  PEOPLE_UPDATE_REQUEST,
  PEOPLE_UPDATE_SUCCESS,
} from "../Constants/PeopleConstants";
import axios from "axios";
import { logout } from "./userActions";

export const listPeople = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PEOPLE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/people/all`, config);

    dispatch({ type: PEOPLE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PEOPLE_LIST_FAIL,
      payload: message,
    });
  }
};

// DELETE PEOPLE
export const deletePeople = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PEOPLE_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/people/${id}`, config);

    dispatch({ type: PEOPLE_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PEOPLE_DELETE_FAIL,
      payload: message,
    });
  }
};

// CREATE PEOPLE
export const createPeople =
  (name, email, dept, price, description, image, countInStock) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: PEOPLE_CREATE_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/people/`,
        { name, email, dept, price, description, image, countInStock },
        config
      );

      dispatch({ type: PEOPLE_CREATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: PEOPLE_CREATE_FAIL,
        payload: message,
      });
    }
  };

// EDIT PEOPLE
export const editPeople = (id) => async (dispatch) => {
  try {
    dispatch({ type: PEOPLE_EDIT_REQUEST });
    const { data } = await axios.get(`/api/people/${id}`);
    dispatch({ type: PEOPLE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PEOPLE_EDIT_FAIL,
      payload: message,
    });
  }
};

// UPDATE PEOPLE
export const updatePeople = (people) => async (dispatch, getState) => {
  try {
    dispatch({ type: PEOPLE_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/people/${people._id}`,
      people,
      config
    );

    dispatch({ type: PEOPLE_UPDATE_SUCCESS, payload: data });
    dispatch({ type: PEOPLE_EDIT_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: PEOPLE_UPDATE_FAIL,
      payload: message,
    });
  }
};
