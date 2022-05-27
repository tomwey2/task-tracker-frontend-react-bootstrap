import {useNavigate, useLocation} from "react-router";
import {useState, useContext} from "react";
import {Link} from "react-router-dom";

import {Flower2} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import AuthContext from "../../AuthContext";
import {login} from "../../services/auth-service";

/*
 * Component for the user login formular.
 * If the login is successful then the user is redirected either to the
 * target page or the home page of the task tracker.
 * If the login is unsuccessful then the error messages is shown.
 */
function LoginForm({title}) {
  const {loggedInUser, setLoggedInUser} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState(null);

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const response = await login(
        e.target.username.value,
        e.target.password.value
      );
      // Authentication of user was successful
      console.log("Login success", response);
      setErrorMessage(null);
      setLoggedInUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      // redirect to uri
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate("/");
      }
    } catch (e) {
      // Authentication was unsuccessful
      console.log("Login failed", e);
      const message = e.response.data
        ? e.response.data.message
        : "Connection to server failed.";
      setErrorMessage(message);
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
          {errorMessage != null ? (
            <h5 className="text-danger mt-2 text-center">{errorMessage}</h5>
          ) : (
            <></>
          )}
          <Card>
            <Card.Header>
              <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control name="username" type="email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control name="password" type="password" />
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
