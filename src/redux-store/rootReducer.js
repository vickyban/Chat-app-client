import { combineReducers } from 'redux';

import user from './user/reducer';
import chatroom from './chatroom/reducer';

const rootReducer = combineReducers({
  user,
  chatroom
});

export default rootReducer;