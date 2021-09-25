import React, {useState, useEffect, useContext} from 'react';
import {Container, Form, Button} from 'react-bootstrap';
import {useHistory } from 'react-router-dom';
import UserContext from '../UserContext';

import Swal from 'sweetalert2'

export default function AddCourse(){

	const {user} = useContext(UserContext);
	const history = useHistory();

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);
	const [isActive, setIsActive] = useState(true);

	let token = localStorage.getItem('token')


	useEffect(()=>{

		if(name !== '' && description !== '' && price !== 0){
			setIsActive(true);
		}else{
			setIsActive(false);
		}

	}, [name, description, price]);


	function addProgram(e){

		e.preventDefault();

		// fetch('https://apithetinker-cap3.herokuapp.com/api/programs/addProgram', {
		fetch('https://apithetinker-cap3.herokuapp.com/api/programs/addProgram', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(res => res.json())
		.then(data => {

			console.log(data);

			if(data === true){

				Swal.fire({
				  title: 'Program successfully added.',
				  icon: "success",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(0,0,123,0.4)`
				})

				history.push('/programs');

			} else {

				Swal.fire({
				  title: 'Oops, something went wrong.',
				  icon: "error",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(255,192,203,0.4)` 
				})

			}
		})

		setName('');
		setDescription('');
		setPrice(0);

	};


	return(
		<Container className="my-5">
			<h1 className="display-5 text-center">Create Program</h1>
			<Form onSubmit={e => addProgram(e)} className="Form">
				<Form.Group>
					<Form.Label className="label">Program Name:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Name of the program"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>

				<Form.Group>
					<Form.Label className="label">Program Description:</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</Form.Group>


				<Form.Group>
					<Form.Label className="label">Program Price:</Form.Label>
					<Form.Control
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>
				</Form.Group>

				{ 
					(isActive === true) ? 
						<Button type="submit" variant="info">Submit</Button>
					:
						<Button type="submit" variant="info" disabled>Submit</Button>
				}
				
				
			</Form>
		</Container>
		)
}
