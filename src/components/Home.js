import React from "react";
import { Container, Button, ButtonGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

/*
 * The home page of the task tracker application.
 */
function Home({ props }) {
  const { user, logout } = useAuth();
  return (
    <Container className="p-4 text-center">
      <h1 className="mt-4">Welcome to the online task tracker</h1>
      <h1>that's just right for your needs</h1>
      <h5 className="mt-4">
        Planning, managing and tracking of all your tasks in one flexible
        software.
      </h5>

      <ButtonGroup className="m-4" aria-label="Basic example">
        <Button variant="outline-success" className="ms-4" disabled>
          manage your projects
        </Button>
        <Button variant="outline-success" className="ms-4" disabled>
          add new tasks
        </Button>
        <Button variant="outline-success" className="ms-4" disabled>
          assign your tasks to other users
        </Button>
        <Button variant="outline-success" className="ms-4" disabled>
          track your tasks along the task workflow
        </Button>
      </ButtonGroup>
      <p></p>
      <Link to="/projects" className="btn btn-success btn-lg" role="button">
        Get Started
      </Link>
    </Container>
  );
}

export default Home;
