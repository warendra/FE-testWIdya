import {
  AUTH_ERROR,
  LOGIN,
  REGISTER,
  UPDATE_INFO_USERS,
  CLEAR,
  LOGOUT,
} from "../actions/types";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token"),
  user: null,
  status: null,
  error: null,
  detailUser: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("token", action.token);
      return {
        ...state,
        isAuthenticated: true,
        token: action.token,
        status: action.status,
        user: action.user
      };
    case REGISTER:
      return {
        ...state,
        status: action.status,
      };
    case UPDATE_INFO_USERS:
      return {
        ...state,
        user: action.user,
        status: action.status,
      };
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        error: null,
        status: null,
      };
    case CLEAR:
      return {
        ...state,
        status: null,
        error: null,
      };
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
        status: null,
      };

    default:
      return state;
  }
};

export default authReducer;
