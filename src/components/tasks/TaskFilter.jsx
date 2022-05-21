import {Link} from "react-router-dom";

import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function SearchForm({requestQuery}) {
  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder={requestQuery}
        aria-label="Search"
        aria-describedby="basic-addon2"
      />
      <Button variant="outline-secondary" id="button-search">
        Search
      </Button>
    </InputGroup>
  );
}

function FilterDroplist(props) {
  return (
    <Dropdown title="Filter">
      <Dropdown.Item href="#/action-1">Your Tasks</Dropdown.Item>
      <Dropdown.Item href="#/action-2">
        Everything assigned to you
      </Dropdown.Item>
      <Dropdown.Item href="#/action-3">
        View advanced search syntax
      </Dropdown.Item>
    </Dropdown>
  );
}

function TaskFilter({requestQuery}) {
  return (
    <Container className="p-4">
      <Row>
        <Col xs={12} md={2}>
          <FilterDroplist />
        </Col>
        <Col xs={12} md={6}>
          <SearchForm requestQuery={requestQuery} />
        </Col>
        <Col xs={12} md={4}>
          <Button className="ms-auto" variant="outline-secondary">
            Labels
          </Button>
          <Link to="/tasks/new" className="ms-2 btn btn-success" role="button">
            New Tasks
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskFilter;
