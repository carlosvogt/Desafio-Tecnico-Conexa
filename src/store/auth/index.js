const initialState = {
  user: null,
};

export default function mode(state = initialState, action) {
  if (action.type === 'SIGN_IN') {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === 'SIGN_OUT') {
    return {
      ...state,
      user: null,
    };
  }

  return state;
}
