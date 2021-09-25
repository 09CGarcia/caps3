import React from 'react';

import{Row, Col, Jumbotron} from 'react-bootstrap'

import{Link} from 'react-router-dom'

export default function ErrorPage(){
	return (
			<Row className="mx-auto">
				<Col className="px-0">
					<Jumbotron fluid className="px-3">
						<h1>Page not Found</h1>
						<h4>Sorry</h4>
						<Link as={Link} to="/" variant="info">Go Back Home</Link>
					</Jumbotron>
				</Col>
			</Row>

		)
}