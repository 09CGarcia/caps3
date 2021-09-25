import React from 'react'

import {Row, Col, Card, Button, Container} from 'react-bootstrap'

export default function Highlights(){

	return(
	<Container fluid>
		<Row>
			<Col xs={12} md={6}>
				<Card>
					<Card.Body className="cards">
						<Card.Title className="heading-highlights text-center">Did You Know That?</Card.Title>
						<Card.Text>
					      Tutoring can help strengthen subject comprehension, boost confidence, and build important learning skills. Tutoring gives students individualized attention that they don't get in a crowded classroom. This helps children who struggle to keep up, as well as those who aren't challenged enough.
						</Card.Text>
				    	<Button variant="info" href="https://www.oxfordlearning.com/benefits-of-tutoring/#:~:text=Tutoring%20can%20help%20strengthen%20subject,who%20aren't%20challenged%20enough.">Read More</Button>
					</Card.Body>
				</Card>
			</Col>
			<Col xs={12} md={6}>
				<Card>
					<Card.Body className="cards">
						<Card.Title className="heading-highlights text-center">Start early!</Card.Title>
						<Card.Text>
					      Access to early childhood education can provide children with social and cognitive experiences that help them become independent and develop a positive attitude to learning. These skills help your child settle into primary school and drive their academic success.
						</Card.Text>
				    	<Button variant="info" href="https://www.careforkindies.com.au/blog/5-ways-your-child-benefits-from-early-childhood-education">Read More</Button>
					</Card.Body>
				</Card>
			</Col>
		</Row>
	</Container>	

	)
}
