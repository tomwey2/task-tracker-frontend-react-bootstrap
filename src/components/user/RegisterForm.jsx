import {useNavigate} from "react-router";
import {useState} from "react";
import {Link} from "react-router-dom";

import {Flower2} from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import {register} from "../../services/user-service";

/*
 * Component for the user register formular.
 * If the registration is successful then the user is redirected to the
 * home page of the task tracker (e.g. "/").
 * If the registration is unsuccessful then the error messages is shown.
 */
function RegisterForm({title}) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const onChangeUsername = e => {
    const username = e.target.value;
    setFormData({...formData, username: username});
  };

  const onChangeEmail = e => {
    const email = e.target.value;
    setFormData({...formData, email: email});
  };

  const onChangePassword = e => {
    const password = e.target.value;
    setFormData({...formData, password: password});
  };

  const onSubmit = async e => {
    e.preventDefault();

    await register(formData.username, formData.email, formData.password)
      // Authentication of user was successful
      .then(response => {
        console.log("Register success", response);
        setErrorMessage(null);
        // redirect to uri
        navigate("/");
      })
      // Authentication was unsuccessful
      .catch(error => {
        console.log("Login failed", error.response);
        setErrorMessage(error.response.data.message);
      });
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
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>User name</Form.Label>
                  <Form.Control type="username" onChange={onChangeUsername} />
                  <Form.Text className="text-muted">
                    Please enter your name
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" onChange={onChangeEmail} />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" onChange={onChangePassword} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
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

RegisterForm.defaultProps = {
  title: "Sign up to Task Tracker"
};

export default RegisterForm;
