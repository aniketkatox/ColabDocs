import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Welcome to our App!</h2>
      <p>Get started by signing up or signing in.</p>
      <Link to="/signup">
        <button>Signup</button>
      </Link>
      <Link to="/signin">
        <button>Signin</button>
      </Link>
    </div>
  );
};

export default Home;
