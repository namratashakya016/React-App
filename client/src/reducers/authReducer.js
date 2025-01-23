// redux/reducers/authReducer.js
const initialState = {
  token: localStorage.getItem('token') || '',
  loading: false,
  error: null,
  message: '', 
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, token: action.payload, loading: false, error: [],message: action.message };
    case 'LOGIN_FAILURE':
      return { ...state, error: Array.isArray(action.payload) ? action.payload : [action.payload], loading: false };
    case 'REGISTER_SUCCESS':
      return { ...state, token: action.payload, loading: false, error: [],message: action.message };
    case 'REGISTER_FAILURE':
      return { ...state, error: Array.isArray(action.payload) ? action.payload : [action.payload], loading: false };
    case 'RESET_ERRORS': // Reset errors when switching forms
      return { ...state, error: [] };
    case 'CLEAR_SUCCESS_MESSAGE':
      return {
        ...state,
        message: null,  // Clear the success message
      };
    default:
      return state;
  }
};

export default authReducer;
