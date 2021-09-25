import React, {useState, useEffect} from 'react'

import {Table, Card, Container, Row, Col} from 'react-bootstrap'

// import UserContext from './../UserContext'

export default function Profile(){
	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('')
	const [enrollments, setEnrollments] = useState([])


	useEffect(() => {
			let token = localStorage.getItem('token');
			fetch('https://apithetinker-cap3.herokuapp.com/api/users/details', {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			})
			.then(result => result.json())
			.then(result => {
				console.log(result)

				let enrollList = result.enrollments.map((subjects) => {
				return (
			    <tr>
			      <td>{subjects.name}</td>
			      <td>{subjects.description}</td>
			      <td>{subjects.status}</td>
			      <td>{subjects.enrolledOn}</td>
			      <td>{subjects.price}</td>
			    </tr>

					)
				})

				setFirstName(result.firstName);
				setLastName(result.lastName);
				setEmail(result.email);
				setEnrollments(enrollList)

			})
		}, [])


	return(
		<Container fluid className="my-3">
			<Table>
			  <tbody>
			    <tr>
			      <td>First Name</td>
			      <td>{firstName}</td>
			    </tr>
			    <tr>
			      <td>Last Name</td>
			      <td>{lastName}</td>
			    </tr>
			    <tr>
			      <td>Email</td>
			      <td colSpan="2">{email}</td>
			    </tr>
			  </tbody>
			</Table>
			<h3>Enrollments</h3>
			<Table>
			  <tbody>
			  	<tr>
			      <th>Program Name</th>
			      <th>Program Description</th>
				  <th>Program Status</th>
			      <th>Program Enrolled Date</th>
			      <th>Program Price</th>
			    </tr>
				{enrollments}
			</tbody>
			</Table>
		</Container>
	
		)
}