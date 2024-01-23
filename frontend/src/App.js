import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Logout from './Components/Logout';
import DocumentDirectory from './Components/DocumentDirectory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/document-directory" element={<DocumentDirectory />} />
      </Routes>
    </Router>
  );
}

export default App;
