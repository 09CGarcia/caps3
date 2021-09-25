import React, {Fragment, useContext} from 'react';
import {Link, NavLink, useHistory} from 'react-router-dom';

import UserContext from './../UserContext';

import {Navbar, Nav} from 'react-bootstrap';

/*app navbar*/
export default function AppNavbar(){
  const {user, unsetUser} = useContext(UserContext);
  let history = useHistory();

  const logout = () => {
    unsetUser();
    history.push('/login');
  }

  let leftNav = (user.id !== null) ? 
        (user.isAdmin === true) ?
          <Fragment>
            <Nav.Link className="link" as={NavLink} to="/addProgram">Add Program</Nav.Link>
            <Nav.Link className="link" onClick={logout}>Logout</Nav.Link>
          </Fragment>
        :
          <Fragment>
            <Nav.Link className="link" as={NavLink} to="/details">Profile</Nav.Link>
            <Nav.Link className="link" onClick={logout}>Logout</Nav.Link>
          </Fragment>
    :
      (
        <Fragment>
            <Nav.Link className="link" as={NavLink} to="/register">Register</Nav.Link>
            <Nav.Link className="link" as={NavLink} to="/login">Login</Nav.Link>    
          </Fragment>

      )

  return (
    <Navbar className="nav" expand="lg" variant="dark">
      <Navbar.Brand className="brand" as={Link} to="/">The Tinker Tutorial</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link className="link" as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link className="link" as={NavLink} to="/programs">Programs</Nav.Link>
        </Nav>
        <Nav>
          {leftNav}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
