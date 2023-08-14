import {
  PEOPLE_CREATE_FAIL,
  PEOPLE_CREATE_REQUEST,
  PEOPLE_CREATE_RESET,
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
  PEOPLE_UPDATE_RESET,
  PEOPLE_UPDATE_SUCCESS,
} from "../Constants/PeopleConstants";

// ALL PEOPLE
export const peopleListReducer = (state = { people: [] }, action) => {
  switch (action.type) {
    case PEOPLE_LIST_REQUEST:
      return { loading: true, people: [] };
    case PEOPLE_LIST_SUCCESS:
      return { loading: false, people: action.payload };
    case PEOPLE_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PEOPLE
export const peopleDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_DELETE_REQUEST:
      return { loading: true };
    case PEOPLE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PEOPLE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// DELETE PEOPLE
export const peopleCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PEOPLE_CREATE_REQUEST:
      return { loading: true };
    case PEOPLE_CREATE_SUCCESS:
      return { loading: false, success: true, people: action.payload };
    case PEOPLE_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PEOPLE_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

// EDIT PEOPLE
export const peopleEditReducer = (
  state = { people: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PEOPLE_EDIT_REQUEST:
      return { ...state, loading: true };
    case PEOPLE_EDIT_SUCCESS:
      return { loading: false, people: action.payload };
    case PEOPLE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// UPDATE PEOPLE
export const peopleUpdateReducer = (state = { people: {} }, action) => {
  switch (action.type) {
    case PEOPLE_UPDATE_REQUEST:
      return { loading: true };
    case PEOPLE_UPDATE_SUCCESS:
      return { loading: false, success: true, people: action.payload };
    case PEOPLE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PEOPLE_UPDATE_RESET:
      return { people: {} };
    default:
      return state;
  }
};
