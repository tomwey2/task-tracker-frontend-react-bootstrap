import React, { useState, useEffect } from "react";
import projectService from "../services/projectService";
import { Link } from "react-router-dom";
import { Card, Row, Col, Spinner, Alert } from "react-bootstrap";

function DashboardPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getProjects();
        setProjects(response.data._embedded.projects);
      } catch (err) {
        setError("Fehler beim Laden der Projekte.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div>
      <h1>Projekte</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {projects.map((project) => (
          <Col key={project.id}>
            <Card
              as={Link}
              to={`/project/${project.id}`}
              style={{ textDecoration: "none" }}
            >
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default DashboardPage;
