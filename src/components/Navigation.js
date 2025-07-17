import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Flower2 } from "react-bootstrap-icons";
import { useAuth } from "../context/AuthContext";

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="me-auto">
          <Flower2 className="me-2" />
          Task Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"></Nav>
          {user ? (
            <>
              <Navbar.Text className="me-3 text-white">
                Signed as: {user.username}
              </Navbar.Text>
              <Button variant="outline-light" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto me-4">
                  <Nav.Link as={Link} to="/login">
                    Sign in
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    Register
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
            //<Nav.Link as={Link} to="/login">
            //  <Button variant="outline-light">Login</Button>
            //</Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
