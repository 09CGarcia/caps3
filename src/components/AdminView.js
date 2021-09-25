import React, {useState, useEffect, Fragment} from 'react'

import {Container, Table, Button, Modal, Form} from 'react-bootstrap'

import Swal from 'sweetalert2';



export default function AdminView(props){
	console.log(props)
	const {programData, fetchData} = props;
	console.log(programData)
	
	const [programId, setProgramId] = useState('');
	const [programs, setPrograms] = useState([]);
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [price, setPrice] = useState(0);

	const [showEdit, setShowEdit] = useState(false);
	const [showAdd, setShowAdd] = useState(false);

	let token = localStorage.getItem('token');

	const openAdd = () => setShowAdd(true);
	const closeAdd = () => setShowAdd(false);



	const openEdit = (programId) => {
		fetch(`https://apithetinker-cap3.herokuapp.com/api/programs/${programId}`,{
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {

			setProgramId(result._id);
			setName(result.name);
			setDescription(result.description);
			setPrice(result.price)
		})

		setShowEdit(true);
	}

	const closeEdit = () => {

		setShowEdit(false);
		setName("")
		setDescription("")
		setPrice(0)
	}

	useEffect( () => {
		const programsArr = programData.map((program) => {
			return(
				<tr key={program._id}>
					<td className="td-desc">{program.name}</td>
					<td className="td-desc">{program.description}</td>
					<td className="td-desc">{program.price}</td>
					<td className="td-desc">
						{
							(program.isActive === true) ?
								<span>Available</span>
							:
								<span>Unavailable</span>
						}
					</td>
					<td>
						<Fragment>
							<Button className="btn mr-3 mb-2" variant="outline-info" size="md" 
							onClick={ ()=> openEdit(program._id) }>
								Edit
							</Button>
							<Button className="btn mr-3 mb-2" variant="outline-danger" size="md"
							onClick={ () => deleteToggle(program._id)}>
								Delete
							</Button>
						</Fragment>

						{
							(program.isActive === true) ?
								<Button className="btn mr-3 mb-2" variant="outline-warning" size="md"
								onClick={()=> archiveToggle(program._id, program.isActive)}>
									Disable
								</Button>
							:
								
								<Button className="btn mr-3 mb-2" variant="outline-success" size="md"
								onClick={ () => unarchiveToggle(program._id, program.isActive)}>
									Enable
								</Button>
								
						}

					</td>
				</tr>
			)
		})

		setPrograms(programsArr)
	}, [programData])

	/*edit program*/
	const editProgram = (e, programId) => {

		e.preventDefault()

		fetch(`https://apithetinker-cap3.herokuapp.com/api/programs/${programId}/edit`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			fetchData()

			if(typeof result !== "undefined"){

				Swal.fire({
				  title: 'Program successfully edited',
				  icon: "success",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(0,0,123,0.4)`
				})

				closeEdit();
			} else {

				fetchData()

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

	/*update program*/
	const archiveToggle = (programId, isActive) => {

		fetch(`https://apithetinker-cap3.herokuapp.com/api/programs/${programId}/archive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			
			fetchData();
			if(result === true){
				
				Swal.fire({
				  title: 'Program successfully archived/unarchived.',
				  icon: "success",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(0,0,123,0.4)`
				})

			} else {
				fetchData();

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

	const unarchiveToggle = (programId, isActive) => {
		fetch(`https://apithetinker-cap3.herokuapp.com/api/programs/${programId}/unarchive`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				isActive: isActive
			})
		})
		.then(result => result.json())
		.then(result => {
			
			fetchData();
			if(result === true){
				
				Swal.fire({
				  title: 'Program successfully archived/unarchived.',
				  icon: "success",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(0,0,123,0.4)`
				})

			} else {
				fetchData();
				
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

	const deleteToggle = (programId) => {
		fetch(`https://apithetinker-cap3.herokuapp.com/api/programs/${programId}/delete`, {
			method: "DELETE",
			headers: {
				"Authorization": `Bearer ${token}`
			}
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)

			fetchData();
			if(result === true){
				
				Swal.fire({
				  title: 'Program successfully deleted.',
				  icon: "success",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(0,0,123,0.4)`
				})

			} else {
				fetchData();
				
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

	const addProgram = (e) => {
		e.preventDefault()
		fetch('https://apithetinker-cap3.herokuapp.com/api/programs/addProgram', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${token}`
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price
			})
		})
		.then(result => result.json())
		.then(result => {
			
			if(result === true){
				fetchData()

				Swal.fire({
				  title: 'Program successfully added.',
				  icon: "success",
				  width: 600,
				  padding: '3em',
				  background: '#fff url(https://i.imgur.com/0M90bAW.png)',
				  backdrop: `rgba(0,0,123,0.4)`
				})

				setName("")
				setDescription("")
				setPrice(0)

				closeAdd();

			} else {
				fetchData();

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
			<div>
				<h2 className="title-admin text-center">Admin Dashboard</h2>
				<div className="d-flex justify-content-end m-2">
					<Button className="btn-block m-3" variant="info" onClick={openAdd}>Add New Program</Button>
				</div>
			</div>
			<Table className="table">
				<thead>
					<tr>
						<th className="heading-table">Name</th>
						<th className="heading-table">Description</th>
						<th className="heading-table">Price</th>
						<th className="heading-table">Availability</th>
						<th className="heading-table">Action</th>
					</tr>
				</thead>
				<tbody>
					{programs}
				</tbody>
			</Table>

		{/*edit*/}
			<Modal show={showEdit} onHide={closeEdit} className="Form">
				<Form onSubmit={ (e) => editProgram(e, programId) }>
					<Modal.Header>
						<Modal.Title className="title-modal">Edit Program</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form.Group controlId="programName">
							<Form.Label className="td-desc">Program Name</Form.Label>
							<Form.Control
								type="text"
								value={name}
								onChange={ (e)=> setName(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="programDescription">
							<Form.Label className="td-desc">Program Description</Form.Label>
							<Form.Control
								type="text"
								value={description}
								onChange={ (e)=> setDescription(e.target.value)}
							/>
						</Form.Group>
						<Form.Group controlId="programPrice">
							<Form.Label className="td-desc">Program Price</Form.Label>
							<Form.Control
								type="number"
								value={price}
								onChange={ (e)=> setPrice(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={closeEdit}>Close</Button>
						<Button variant="info" type="submit">Submit</Button>
					</Modal.Footer>
				</Form>
			</Modal>


		{/*add program*/}
		<Modal show={showAdd} onHide={closeAdd} className="Form">
			<Form onSubmit={ (e) => addProgram(e) }>
				<Modal.Header className="title-modal">Add Program</Modal.Header>
				<Modal.Body>
					<Form.Group programId="programName">
						<Form.Label className="td-desc">Program Name</Form.Label>
						<Form.Control 
							type="text"
							value={name}
							onChange={(e)=> setName(e.target.value)}
						/>
					</Form.Group>
					<Form.Group programId="programDescription">
						<Form.Label className="td-desc">Program Description</Form.Label>
						<Form.Control
							type="text"
							value={description}
							onChange={(e)=> setDescription(e.target.value)}
						/>
					</Form.Group>
					<Form.Group programId="programPrice">
						<Form.Label className="td-desc">Program Price</Form.Label>
						<Form.Control 
							type="number"
							value={price}
							onChange={(e)=> setPrice(e.target.value)}
						/>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={closeAdd}>Close</Button>
					<Button variant="info" type="submit">Submit</Button>
				</Modal.Footer>
			</Form>
		</Modal>
		</Container>
	)
}
