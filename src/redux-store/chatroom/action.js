export const NEW_TEXT = 'message';

export const addNewMessage = message => ({
  type: NEW_TEXT,
  data: message
})
