import React from 'react'

import Container from 'react-bootstrap/Container'

import Banner from './../components/Banner';
import Highlights from './../components/Highlights';
import RandomProgram from './../components/RandomProgram';

export default function Home(){

	return(
		<Container fluid>
			<Banner/> 
			<Highlights/>
			<RandomProgram/>
		</Container>
	)
}
