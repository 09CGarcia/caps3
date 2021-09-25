import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

import {Card, Button, Container, Row, Col} from 'react-bootstrap';

import {Link} from 'react-router-dom';


export default function Program({programProp}){
	console.log(programProp)

	const {name, description, price, _id} = programProp	

return(

	<Container className="card-container my-5 inline-block" xs={12} md={6}>
			<Card >
				<Card.Body className="cards">
					<Card.Title className="heading-highlights">{name}</Card.Title>
					<h5>Description</h5>
					<p>{description}</p>
					<h5>Price:</h5>
					<p>{price}</p>
				
			    	<Link className="btn btn-info" to={`/programs/${_id}`}>
			    		Details
			    	</Link>
				</Card.Body>
			</Card>	
	</Container>	
	)
}


Program.propTypes = {
	program: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired
	})
}
