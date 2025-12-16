import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

import {auth} from "./firebase.js";

function NavBar({setPage}) {

  const navbarColor = '#c0dffa';
  

  return (
    <>
      <Navbar expand="sm" id="navBar" style={{ backgroundColor: navbarColor }} className="py-3 shadow-sm mb-4">
        <Container>
          <Navbar.Brand onClick={()=>{setPage("allStudySets")}} style={{ fontWeight: 'bold', color: '#003366', fontSize:'30px', cursor: 'pointer' }}>
            Dashboard
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav" style={{color: '#003366', fontSize:'20px' }}>
            <Nav className="me-auto ms-3 gap-2 align-items-left" >
              <Nav.Link onClick={()=>{setPage("createStudySet")}} style={{color: '#003366', fontWeight: '500', fontSize: '20px'}}>Create Study Set</Nav.Link>
              <Nav.Link onClick={()=>{setPage("settingsPage")}} style={{color: '#003366', fontWeight: '500', fontSize: '20px'}}>Settings</Nav.Link>
            </Nav>
            <Nav>
              <Button variant="outline-danger" size="sm" onClick={() => { auth.signOut() }} className="px-3 fw-bold" // px-3 makes the button wider/nicer
                style={{ borderRadius: '20px', borderWidth: '2px' }}>
                  Log Out
              </Button>
            </Nav>
          </Navbar.Collapse>
          
        </Container>
        
      </Navbar>
    </>
  )
}

export default NavBar
