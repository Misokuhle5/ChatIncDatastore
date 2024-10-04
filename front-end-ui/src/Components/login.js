import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
 
const Login = () => {
  // State to hold username, password, and any error messages
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook for programmatic navigation
 
  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(''); // Clear any previous error messages
 
    try {
      // Make a POST request to the login endpoint with username and password
      const response = await fetch('/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
 
      // Check if the response is successful
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        localStorage.setItem('api_key', data.api_key); // Store API key in local storage
        navigate('/dashboard'); // Redirect to the dashboard on successful login
      } else {
        const errorData = await response.json(); // Parse the error response
        setError(errorData.message || 'Login failed. Please try again.'); // Set error message
      }
    } catch (error) {
      // Handle any network or unexpected errors
      setError('An error occurred. Please try again later.'); // Set a generic error message
      console.error('Error during login:', error); // Log the error for debugging
    }
  };
 
  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if exists */}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state on change
          required // Make this field required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state on change
          required // Make this field required
        />
        <button type="submit">Login</button> {/* Submit button */}
      </form>
 
      {/* Link to sign-up page for new users */}
      <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
};
 
export default Login;