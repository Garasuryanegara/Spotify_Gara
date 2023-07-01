import { auth_types } from "./types";

const init = {
  email: "",
  password: "",
};

function userReducer(state = init, action) {
  //action adalah event yang terjadi
  if (action.type == auth_types.login) {
    return {
      ...state,
      email: action.payload.email,
      password: action.payload.password,
      name: action.payload.name,
      birthdate: action.payload.birthdate,
    };
  } else if (action.type == auth_types.logout) {
    return init;
  }
  return state;
}

export default userReducer;
