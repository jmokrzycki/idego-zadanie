export const setUsers = users => ({
  type: "SET_USERS",
  users
});

export const addUser = user => ({
  type: "ADD_USER",
  user
});

export const deleteUser = user => ({
  type: "DELETE_USER",
  user
});

export const selectUser = user => ({
  type: "SELECT_USER",
  user
});

export const updateForm = (key, value) => ({
  type: "UPDATE_USER_FORM",
  key,
  value
});
