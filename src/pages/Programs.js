import React, {useState, useEffect, useContext} from 'react';

import {Container} from 'react-bootstrap'

import AdminView from './../components/AdminView.js';
import UserView from './../components/UserView.js';

import UserContext from './../UserContext';

export default function Programs(){

	const [programs, setPrograms] = useState([]);

	const {user} = useContext(UserContext);


	const fetchData = () => {
		let token = localStorage.getItem('token')

		fetch('https://apithetinker-cap3.herokuapp.com/api/programs/all',{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			// console.log(result)
			
			setPrograms(result)
		})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return(
		<Container className="p-4">
			{ (user.isAdmin === true) ?
					<AdminView programData={programs} fetchData={fetchData}/>
				:
					<UserView programData={programs} />
			}
		</Container>
	)
}
