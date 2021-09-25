import React, {useState, useEffect} from 'react'
import {Card, Row, Container, Col} from 'react-bootstrap'

export default function RandomProgram(){
	const [description, setDescription] = useState([]);
	const [name, setName] = useState([]);
	const [price, setPrice] = useState([]);

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
			let randomMath = Math.floor(Math.random() * result.length);
			console.log(randomMath);
			console.log(result[randomMath]);
			setName(result[randomMath].name);
			setDescription(result[randomMath].description);
			setPrice(result[randomMath].price);
		})
	}

	useEffect(() => {
		fetchData()
	}, [])

	return(

		<Container fluid>
		<Row>
			<Col xs={12}>
				<Card className="cards p-3">
				<Card.Img src="https://i.imgur.com/0M90bAW.png" height="200px"/>
				<Card.ImgOverlay>
				  
				  	<Card.Title className="m-3 text-center">Featured Program</Card.Title>
				    <Card.Text className="text-center">{name}</Card.Text>
				    <Card.Text className="text-center">{description}</Card.Text>
				    <Card.Text className="text-center">{price}</Card.Text>
				</Card.ImgOverlay>
				</Card>
			</Col>	
		</Row>	
	</Container>		
		)
}