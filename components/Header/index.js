import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link'
// import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <header>
       <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
       
        <Link  href='/'><Navbar.Brand style={{'cursor': 'pointer'}}>eCommerce</Navbar.Brand></Link>
  
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
             
            <Link passHref href='/cart'><Nav.Link  ><i className='fas fa-shopping-cart'></i>cart</Nav.Link></Link>
              
    
            <Link passHref href='/login'><Nav.Link ><i className='fas fa-user'></i>login</Nav.Link></Link>
          
             
              
            
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header