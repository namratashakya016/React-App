import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from './actions/authActions';
import { resetErrors } from './actions/authActions';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register

  const dispatch = useDispatch();

  // Get errors from Redux state
  const errors = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.message);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = isLogin ? { email, password } : { name, email, password };
    dispatch(isLogin ? loginUser(credentials) : registerUser(credentials)); // Assuming registerUser is defined
  };

  // Toggle between login and register
  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
    dispatch(resetErrors()); // Reset errors when switching form
    dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' }); 
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1>{isLogin ? 'Login' : 'Register'}</h1>

        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
          </div>
        )}

        {/* Display error messages */}
        {errors && errors.length > 0 && (
          <div className="error-messages">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-field">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        </form>

        {/* Switch between login and register */}
        <button onClick={handleSwitchForm} className="switch-form-btn">
          {isLogin ? 'Create an account' : 'Already have an account? Login'}
        </button>
      </div>
    </div>
  );
};

export default App;
