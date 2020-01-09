import Immutable from 'seamless-immutable';

/**
 * Types
 */
export const Types = {
  SET: 'error/SET',
  HIDE: 'error/HIDE',
};

/**
 * Reducer
 */
const initialState = Immutable({
  visible: false,
  message: null,
  toasted: false
});

export default function error(state = initialState, action) {
  switch (action.type) {
    case Types.SET:
      return { ...state, visible: true, message: action.payload.message, toasted: action.payload.toasted };
    case Types.HIDE:
      return { ...state, visible: false, toasted: false };
    default:
      return state;
  }
}

/**
 * Actions
 */
export const Creators = {
  setError: (message, options) => ({
    type: Types.SET,
    payload: { message, ...options },
  }),

  hideError: () => ({ type: Types.HIDE }),
};
