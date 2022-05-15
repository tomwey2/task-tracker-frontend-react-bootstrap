import {Flower2} from "react-bootstrap-icons";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function Header({title, user}) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="ps-4">
        <Navbar.Brand>
          <Flower2 className="me-2" />
          {title}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto me-4">
            <Nav.Link href="#login">Sign in</Nav.Link>
            <Nav.Link href="#register">Register</Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Text>
          User: <a href="#login">{user}</a>
        </Navbar.Text>
      </Container>
    </Navbar>
  );
}

Header.defaultProps = {
  title: "Task Tracker"
};

export default Header;
