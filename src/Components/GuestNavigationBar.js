import React         from 'react';
import {Nav, Navbar} from 'react-bootstrap';
import styled        from 'styled-components';

const Styles = styled.div`
  .navbar { background-color: #222; padding:0% 2%}
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
  .ml-auto, .mx-auto {
    margin-left: auto!important;
  }
`;
export const GuestNavigationBar = () => (
    <Styles>
        <Navbar expand = "lg">
            <Navbar.Brand href = "/">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls = "basic-navbar-nav"/>

            <Navbar.Collapse id = "basic-navbar-nav">
                <Nav className = "ml-auto">
                    <Nav.Item><Nav.Link href = "/register">Register</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link href = "/login">Login</Nav.Link></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </Styles>
);