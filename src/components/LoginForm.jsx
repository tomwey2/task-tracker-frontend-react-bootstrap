import {useNavigate, useLocation} from "react-router";
import {useState} from "react";
import {Link} from "react-router-dom";

import {Flower2} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import UserService from "../services/user-service";

function LoginForm({title, onChangeUser}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = e => {
    const username = e.target.value;
    console.log("changed username: " + username);
    setUsername(username);
  };
  const onChangePassword = e => {
    const password = e.target.value;
    console.log("changed password: " + password);
    setPassword(password);
  };

  const onSubmit = e => {
    e.preventDefault();

    UserService.login(username, password);
    onChangeUser("tomwey2");
    if (location.state?.from) {
      console.log(location.state?.from);
      navigate(location.state.from);
    } else {
      navigate("/");
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col cxs={12} md={6}>
          <Container className="text-center">
            <Flower2 size={50} />
          </Container>
          <h3 className="mt-2 text-center">{title}</h3>

          <Card>
            <Card.Header>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" onChange={onChangeUsername} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={onChangePassword} />
                </Form.Group>
                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Sign In
                  </Button>
                </div>
              </Form>
            </Card.Header>
            <Card.Body>
              <p className="text-center">
                New to Task Tracker?
                <Link to="/register" className="ms-2">
                  <b>Create an account</b>
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginForm.defaultProps = {
  title: "Sign in to Task Tracker"
};

export default LoginForm;
