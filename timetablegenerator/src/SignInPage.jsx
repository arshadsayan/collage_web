import React, { useState } from 'react';

export default function SignInPage({ onSignIn, goToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://influences-assume-bizarre-forecasts.trycloudflare.com/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success) {
        alert('Login successful');
        onSignIn(result.userData);
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Network error: ' + error.message);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSignIn}>
      
      <h1 className="center page-heading">Sign-In</h1>
        <div className='input-field'>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='input-field'>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <br></br>
        <div className="buttons">
            <button  type="submit">Sign In</button>
            <button  type="button" onClick={goToSignup}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
