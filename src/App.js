import React, {useState, useEffect} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import UserContext from './UserContext';

import AppNavBar from './components/AppNavBar';
import Home from './pages/Home'
import Programs from './pages/Programs';
import Register from './pages/Register';
import Login from './pages/Login';
import ErrorPage from './components/ErrorPage';
import SpecificProgram from './pages/SpecificProgram';
import AddProgram from './pages/AddProgram';
import Profile from './pages/Profile';

export default function App(){

	const [user, setUser] = useState(

		{
			id: null,
			isAdmin: null
		}
	);
	const unsetUser = () => {
		localStorage.clear();
		setUser({
			id: null,
			isAdmin: null
		})
	}

	useEffect( () => {
		let token = localStorage.getItem('token');
		fetch('https://apithetinker-cap3.herokuapp.com/api/users/details', {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
		if(typeof result._id !== "undefined"){
				setUser({
					id: result._id,
					isAdmin: result.isAdmin
				})
			} else {
				setUser({
					id: null,
					isAdmin: null
				})
			}
		})
	}, [])

	return( 
	<UserContext.Provider value={{user, setUser, unsetUser}}> 
		<BrowserRouter>
			<AppNavBar/>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/programs" component={Programs} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/programs/:programId" component={SpecificProgram} />
				<Route exact path="/addProgram" component={AddProgram} />
				<Route exact path="/details" component={Profile} />
				<Route component={ErrorPage} />
			</Switch>
		</BrowserRouter>
	</UserContext.Provider>
	)
}
