import * as React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import logo from '../images/icon.png'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const NavbarToggle = styled(Navbar.Toggle)`
  border: none;
`

const BrandLink = styled(Link)`
  display: flex;
  align-items: center;
`

const CallToActionLink = styled(Link)`
  margin-right: 1rem;
`

export const Header = (props: { location: Location }) => {
  return (
    <>
      <Navbar collapseOnSelect bg="light" expand="md">
        <BrandLink className="nav-link navbar-brand" to="/">
          <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top mr-3" />
          Chord
        </BrandLink>
        <NavbarToggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <span className="mr-auto" />
          <Nav>
            {/* {props.location?.pathname !== '/' && (
              <CallToActionLink className="btn btn-dark cta mr-0 mx-3" to="/">
                Create Chord Diagram
              </CallToActionLink>
            )} */}

            {/* <Link className="nav-link" to="/news">
              News
            </Link>
            <Link className="nav-link" to="/help">
              Help
            </Link>
            <Link className="nav-link" to="/about">
              About
            </Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

export default Header
