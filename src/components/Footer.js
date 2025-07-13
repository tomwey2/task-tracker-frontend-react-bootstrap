import { Github } from "react-bootstrap-icons";
import { Nav, Container } from "react-bootstrap";

/*
 * The footer component with copyright info and links to social media.
 */
function Footer() {
  return (
    <footer>
      <Container className="p-4">
        <Nav className="justify-content-center" activeKey="/home">
          <Nav.Item className="">
            <Nav.Link className="link-dark" href="https://weyrath.com/">
              (c) 2025 Thomas Weyrath
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="ms-auto">
            <Nav.Link className="link-dark" href="https://github.com/tomwey2">
              Source at github.com <Github />
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </footer>
  );
}

export default Footer;
