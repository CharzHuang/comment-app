const SET_ENVIRONMENT = "SET_ENVIRONMENT";

const initialState = {
  env: "client"
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
      return {
        env: action.payload
      };
    default:
      return state;
  }
};

export const setEnvironment = env => {
  return {
    type: SET_ENVIRONMENT,
    payload: env
  };
};
