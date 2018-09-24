export default function login(state = { loggedInStatus: false }, action = {}) {
  switch (action.type) {
    case "SET_LOGGED_IN_STATUS":
      return { ...state, loggedInStatus: action.loggedInStatus };
    default:
      return state;
  }
}
