import React, {useState, useEffect, useContext} from 'react';

import {useHistory, Redirect} from 'react-router-dom';

import {Container, Form, Button, Col, Row, Span} from 'react-bootstrap';

import UserContext from './../UserContext';

import Swal from 'sweetalert2';



export default function Register(){
	
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [verifyPassword, setVerifyPassword] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const {user} = useContext(UserContext)

	let history = useHistory();

	useEffect( () => {
		if(email !== '' && password !== '' && verifyPassword !== '' && password === verifyPassword){
			setIsDisabled(false)
		} else {
			setIsDisabled(true)
		}
	}, [email, password, verifyPassword]);


	function register(e){
		e.preventDefault();

		fetch('https://apithetinker-cap3.herokuapp.com/api/users/checkEmail', {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email
			})
		})
		.then( result => result.json())
		.then( result => {
			console.log(result)
			if(result === true){
				
				Swal.fire({
					title: 'Duplicate email found',
					icon: 'error',
					text: 'Please choose another email'
				})
			} else {
				
				fetch('https://apithetinker-cap3.herokuapp.com/api/users/register', {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						firstName: firstName,
						lastName: lastName,
						email: email,
						mobileNo: mobileNo,
						password: password
					})
				})
				.then( result => result.json())
				.then( result => {
					if(result === true){
						console.log(result)

						Swal.fire({
							title: "Registration Successful",
							icon: "success",
							text: "Welcome to The Tinker Tutorial"
						})

						history.push('/login');

					} else {
						Swal.fire({
							title: 'Something went wrong',
							icon: 'error',
							text: 'Please try again'
						})
					}
				})

			}
		})

		setEmail('');
		setPassword('');
		setVerifyPassword('');
	}

	return(
		(user.id !== null) ?

			<Redirect to="/" />

		:
			<Container className="mb-5">
				<Col>
					<h1 className="display-5 text-center">Start your journey with us!</h1>
					<Form className="Form" onSubmit={(e)=> register(e)}>
						

						<Form.Group className="mb-3" controlId="formfirstName">
							<Form.Label className="label">First Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Firstname" value={firstName}
							onChange={(e)=> setFirstName(e.target.value) }/>
						</Form.Group>
						  
						<Form.Group className="mb-3" controlId="formlastName">
							<Form.Label className="label">Last Name</Form.Label>
							<Form.Control type="text" placeholder="Enter Lastname" value={lastName}
							onChange={(e)=> setLastName(e.target.value) }/>
						</Form.Group>
					
						<Form.Group className="mb-3" controlId="formmobileNo">
							<Form.Label className="label">Mobile Number</Form.Label>
							<Form.Control type="text" placeholder="Enter mobile mumber" value={mobileNo}
							onChange={(e)=> setMobileNo(e.target.value) }/>
						</Form.Group>
					
						<Form.Group className="mb-3" controlId="formBasicEmail">
							<Form.Label className="label">Email address</Form.Label>
							<Form.Control type="email" placeholder="Enter email" value={email}
							onChange={(e)=> setEmail(e.target.value) }/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formBasicPassword">
							<Form.Label className="label">Password</Form.Label>
							<Form.Control type="password" placeholder="Password" value={password}
							onChange={(e)=> setPassword(e.target.value) }/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="formVerifyPassword">
							<Form.Label className="label">Verify Password</Form.Label>
							<Form.Control type="password" placeholder="Verify Password"  value={verifyPassword}
							onChange={(e)=> setVerifyPassword(e.target.value)}/>
						</Form.Group>

						<Button variant="info" type="submit" disabled={isDisabled}>Submit</Button>
					</Form>
				</Col>
			</Container>
	)
}
