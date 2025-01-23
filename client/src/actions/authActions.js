import axios from 'axios';

// redux/actions/authActions.js
export const resetErrors = () => {
  return {
    type: 'RESET_ERRORS',
  };
};

export const clearSuccessMessage = () => ({
  type: 'CLEAR_SUCCESS_MESSAGE'
});

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    if (response && response.data) {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token, message: response.data.message });
    }
  } catch (error) {
    if (error.response) {
      console.log("Backend error response:", error.response.data.error); // For debugging

      // Handle both single error message and multiple error messages
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: error.response.data.error ? [error.response.data.error] : error.response.data.errors || ['An unknown error occurred.'],
      });
    } else {
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: ['Network error, please try again.'],
      });
    }
  }
};



export const registerUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', credentials);
    if (response && response.data) {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data.token, message: response.data.message });
    }
  } catch (error) {
    if (error.response) {
      console.log("Backend validation errors:", error.response.data.errors); // For debugging

      // If the response contains validation errors, pass them to Redux
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: error.response.data.errors || ['Something went wrong, please try again.'],
      });
    } else {
      dispatch({
        type: 'REGISTER_FAILURE',
        payload: ['Network error, please try again.'],
      });
    }
  }
};


