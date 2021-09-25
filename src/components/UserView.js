import React, {useState, useEffect} from 'react'

import{Container} from 'react-bootstrap'

import Program from './Program'

export default function UserView({programData}){
	// console.log(programData)

	const [program, setProgram] = useState([])

	useEffect(() => {
		const programsArr = programData.map((program) => {
			if (program.isActive === true){
				return <Program key={program._id} programProp={program}/>
			} else {
				return null
			}
			
		})

		setProgram(programsArr)

	}, [programData])


	return (
		<Container>
			{program}
		</Container>
	)
}