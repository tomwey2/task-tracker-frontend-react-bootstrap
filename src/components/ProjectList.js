import { RecordCircle } from "react-bootstrap-icons";
import { Container, Card, Table, Nav } from "react-bootstrap";

function FilterHeader({ countProjects }) {
  return (
    <Container className="p-2">
      <Nav>
        <Nav.Item>
          <Nav.Link type="button">
            <RecordCircle />
            <span className="ms-2">{countProjects}</span> Projects
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

function ProjectRow({ project, selectedProjectId, handleOnSelectProject }) {
  return (
    <tr key={project.id} onClick={() => handleOnSelectProject(project.id)}>
      {/* a click on the tr navigates to /users/:id */}
      <td>
        {selectedProjectId === project.id ? (
          <b>{project.name}</b>
        ) : (
          project.name
        )}
      </td>
    </tr>
  );
}

function CardBody({ projects, selectedProjectId, handleOnSelectProject }) {
  return (
    <Table hover>
      <tbody>
        {projects.map((project) => {
          console.log("project=", project);
          return (
            <ProjectRow
              key={project.id}
              project={project}
              selectedProjectId={selectedProjectId}
              handleOnSelectProject={handleOnSelectProject}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

function ProjectList({ projects, selectedProjectId, handleOnSelectProject }) {
  return (
    <Container>
      <FilterHeader countProjects={projects.length} />
      <Card>
        <Card.Header>
          <p>Projects</p>
        </Card.Header>
        <Card.Body>
          <CardBody
            projects={projects}
            selectedProjectId={selectedProjectId}
            handleOnSelectProject={handleOnSelectProject}
          />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProjectList;
