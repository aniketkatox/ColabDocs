import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Signup from './Components/Signup';
import Signin from './Components/Signin';
import Logout from './Components/Logout';
import LogInForm from './Components/LogInForm';
import Main from './Components/Main';
import DocumentDirectory from './Components/DocumentDirectory';

function App() {

	return (
		<div id="main">
		<Main></Main>
		{/* <Router>
			<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<Signup />} />
			<Route path="/signin" element={<Signin />} />
			<Route path="/logout" element={<Logout />} />
			<Route path="/document-directory" element={<DocumentDirectory />} />
			</Routes>
		</Router> */}
		</div>
	);
}

export default App;
