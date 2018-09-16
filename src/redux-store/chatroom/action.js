export const NEW_TEXT = 'message';
export const ROOM_LIST = 'rooms';

export const addNewMessage = message => ({
  type: NEW_TEXT,
  data: message
})

export const updateRoomList = roomList => ({
  type: ROOM_LIST,
  data: roomList
})
