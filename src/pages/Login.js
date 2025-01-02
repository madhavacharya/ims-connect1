import React, { useState } from 'react';
import { auth } from '../config/Firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if email is verified
      if (!user.emailVerified) {
        setError('Email not verified. Please check your inbox.');
        return;
      }

      // Set login state and navigate to homepage
      setIsLoggedIn(true);
      navigate('/');
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === 'auth/user-not-found') {
        setError('No user found with this email.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Failed to log in. Please try again later.');
      }
      console.error(err);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      await signOut(auth);
      setIsLoggedIn(false); // Update login state
      navigate('/login'); // Redirect to login page after logout
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center col-md-6">
        <form className="p-4 shadow-lg" onSubmit={isLoggedIn ? handleLogout : handleLogin}>
          <h1 className="text-center text-muted mb-4">
            {isLoggedIn ? 'Welcome Back!' : 'Login'}
          </h1>

          {/* Error Message */}
          {error && <div className="alert alert-danger">{error}</div>}

          {!isLoggedIn && (
            <>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className={`btn w-100 ${isLoggedIn ? 'btn-danger' : 'btn-primary'}`}>
            {isLoggedIn ? 'Log Out' : 'Log In'}
          </button>

          {!isLoggedIn && (
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup" className="text-primary">Sign Up</Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
