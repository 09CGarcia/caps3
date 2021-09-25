import React, {useContext, useEffect, useState} from 'react';

import UserContext from './../UserContext';

import {Link, useParams, useHistory} from 'react-router-dom';

import {Container, Card, Button} from 'react-bootstrap';

import Swal from 'sweetalert2';


export default function SpecificProgram(){

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0)

	const {user} = useContext(UserContext);

	const {programId} = useParams();

	let token = localStorage.getItem('token')

	let history = useHistory();

	useEffect( () => {
		fetch(`https://apithetinker-cap3.herokuapp.com/api/programs/${programId}`,
			{
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`
				}
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			setName(result.name);
			setDescription(result.description);
			setPrice(result.price);
		})
	}, [])

	const enroll = () => {
		fetch('https://apithetinker-cap3.herokuapp.com/api/users/enroll', 
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
				body: JSON.stringify({
					programId: programId,
					name: name,
					description: description,
					price: price 
				})
			}
		)
		.then(result => result.json())
		.then(result => {
			console.log(result)

			if(result === true){

				Swal.fire({
				  title: 'You have successfully enrolled!',
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
	}

	return(
		<Container>
			<Card className="cards m-5">
				<Card.Header>
					<h4>
						{name}
					</h4>
				</Card.Header>
				<Card.Body>
					<Card.Text>
						{description}
					</Card.Text>
					<h6>
						Price: Php 
						<span className="mx-2">{price}</span>
					</h6>
				</Card.Body>
				<Card.Footer>
					{
						(user.id !== null) ?
								<Button variant="info m-3" 
								onClick={ () => enroll() }

								>Enroll</Button>
							:
								<Link className="btn btn-danger" to="/login">Login to Enroll</Link>
					}
				</Card.Footer>
			</Card>
		</Container>
	)
}
