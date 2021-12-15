import React from 'react';

import{Container, Row, Col, Jumbotron, Button} from 'react-bootstrap'

import{NavLink} from 'react-router-dom'

export default function Banner(){
	return (

	<Container fluid>
			<Row>
				<Col className="px-0">
					<Jumbotron fluid className="jumbotron px-3">
						<h1 className="heading text-center">The Tinker Tutorial</h1>
						<p className="desc text-center">Makes learning fun and productive.</p>
						<div className="d-flex justify-content-center">
							<Button className="btn btn-info" size="lg" as={NavLink} to="/programs">Avail Our Services</Button>
						</div>	
					</Jumbotron>
				</Col>
			</Row>
			
		</Container>

		)
}
