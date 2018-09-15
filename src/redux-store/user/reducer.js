import { LOG_IN, LOG_OUT } from "./action";

const initialState = {
  userId: '',
  username: 'poyo',
  isLogin: false,
  authToken: ''
}

export default function (state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case LOG_IN:
      return {
        ...state,
        userId: data.id,
        username: data.username,
        isLogin: true,
      };
    case LOG_OUT:
      return {
        ...state,
        username: '',
        isLogin: false,
        authToken: ''
      };
    default:
      return state;
  }
}