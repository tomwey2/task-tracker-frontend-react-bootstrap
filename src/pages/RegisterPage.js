import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flower2 } from "react-bootstrap-icons";
import {
  Form,
  Button,
  Container,
  Card,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext"; // Import the hook

/*
 * Component for the user register formular.
 * If the registration is successful then the user is redirected to the
 * home page of the task tracker (e.g. "/").
 * If the registration is unsuccessful then the error messages is shown.
 */
function RegisterForm() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [toggleCheckMeOut, setToggleCheckMeOut] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await register(
        e.target.username.value,
        e.target.password.value,
        e.target.email.value,
        toggleCheckMeOut,
      );
      // Authentication of user was successful
      setError(null);
      navigate("/");
    } catch (error) {
      // Authentication was unsuccessful
      setError(error.message);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col cxs={12} md={6}>
          <Container className="text-center">
            <Flower2 size={50} />
          </Container>
          <h3 className="mt-2 text-center">Register to Task Tracker</h3>
          {error && <Alert variant="danger">{error}</Alert>}

          <Card>
            <Card.Header>
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>User name</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="enter username"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter email address"
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="enter password"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Check me out"
                    defaultChecked={toggleCheckMeOut}
                    onChange={() => setToggleCheckMeOut(!toggleCheckMeOut)}
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit">
                    Sign Up
                  </Button>
                </div>
              </Form>
            </Card.Header>
            <Card.Body>
              <p className="text-center">
                Already have an account?
                <Link to="/login" className="ms-2">
                  <b>Sign in</b>
                </Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterForm;
