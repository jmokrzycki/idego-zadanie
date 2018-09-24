let user = {
  id: "",
  username: "",
  password: "",
  email: ""
};

let users = [];

let initialState = {
  user,
  users: []
};

export default function login(state = initialState, action = {}) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.users };
    case "UPDATE_USER_FORM":
      return {
        ...state,
        user: {
          ...state.user,
          [action.key]: action.value
        }
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.user]
      };
    case "SELECT_USER":
      return { ...state, user: action.user };
    default:
      return state;
  }
}
