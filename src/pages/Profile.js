import React, {useState, useEffect} from 'react'

import {Card, Container, Row, Col} from 'react-bootstrap'

// import UserContext from './../UserContext'

export default function Profile(){
	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('')
	const [enrollments, setEnrollments] = useState([])

				// let enrollList = "";
				// 	for (let i = 0; i < result.enrollments.length; i++ ){

				// 		enrollList += `<Card.Text>${result.enrollments[i].name}</Card.Text>`;
				// 	}

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
					<>
					<h5 >{subjects.name}</h5>
					<p >{subjects.description}</p>
					<p >{subjects.price}</p>
					<p >{subjects.status}</p>
					<p >{subjects.enrolledOn}</p>
					</>
					)
				})

				setFirstName(result.firstName);
				setLastName(result.lastName);
				setEmail(result.email);
				setEnrollments(enrollList)

			})
		}, [])


	return(

	<Container fluid>
		
		<Card className="cards">
		  <Card.Header>My Profile</Card.Header>
		  <Card.Body>
		<Row md={6} xs={12}>
		  	<Col>
			    <Card.Title className="card-title pt-3">First Name:</Card.Title>
			    <Card.Text>{firstName}</Card.Text>
		    </Col>
		</Row>
		  
		<Row md={6} xs={12}>
		    <Col>
			    <Card.Title className="card-title pt-3">Last Name:</Card.Title>
			    <Card.Text>{lastName}</Card.Text>
		    </Col>
		</Row>
		    
		<Row md={6} xs={12}>
		    <Col>  
			    <Card.Title className="card-title pt-3">Email:</Card.Title>
			    <Card.Text>{email}</Card.Text>
		    </Col>
		</Row>


		<Row md={6} xs={12}>
		    <Col> 
			    <Card.Title className="card-title pt-3">Enrollments:</Card.Title>
			    <Card.Text>{enrollments}</Card.Text>
		  	</Col>
		</Row>
		  	</Card.Body>
		</Card>

	</Container>	
		)
}