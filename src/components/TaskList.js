import { RecordCircle, Check2 } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  Table,
  Row,
  Col,
  Nav,
  Dropdown,
  DropdownButton,
  Button,
  InputGroup,
  Form,
  FormControl,
} from "react-bootstrap";

function FilterHeader({ countOpen, countClosed, handleIsOpenTasks }) {
  return (
    <Container className="p-2">
      <Nav>
        <Nav.Item>
          <Nav.Link type="button" onClick={() => handleIsOpenTasks(true)}>
            <RecordCircle />
            <span className="ms-2">{countOpen}</span> Open
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link type="button" onClick={() => handleIsOpenTasks(false)}>
            <Check2 /> <span className="ms-2">{countClosed}</span> Closed
          </Nav.Link>
        </Nav.Item>
        <Link to="/tasks/new" className="ms-auto btn btn-success" role="button">
          New Tasks
        </Link>
      </Nav>
    </Container>
  );
}

function SearchForm({ requestQuery, handleOnSearchTasks }) {
  return (
    <Form>
      <InputGroup className="mb-0">
        <FormControl
          type="text"
          as="input"
          readOnly={true}
          value={requestQuery}
        />
        <Button
          variant="outline-secondary"
          onClick={() => handleOnSearchTasks()}
        >
          Search
        </Button>
      </InputGroup>
    </Form>
  );
}

function FilterDroplist({ handleOnFilterTasks }) {
  return (
    <DropdownButton title="Filter">
      <Dropdown.Item onClick={() => handleOnFilterTasks("")}>
        Clear Filter
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleOnFilterTasks("reportedby:@me")}>
        Your Tasks
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleOnFilterTasks("assignedto:@me")}>
        Everything assigned to you
      </Dropdown.Item>
    </DropdownButton>
  );
}

function Sort({ handleOnSortTasks }) {
  return (
    <DropdownButton title="Sort by">
      <Dropdown.Item onClick={() => handleOnSortTasks("sort:creation")}>
        creation date
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleOnSortTasks("sort:reporter")}>
        reporter
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleOnSortTasks("sort:assignee")}>
        assignee
      </Dropdown.Item>
    </DropdownButton>
  );
}

function CardHeader({
  requestQuery,
  handleOnSearchTasks,
  handleOnFilterTasks,
  handleOnSortTasks,
}) {
  return (
    <Row>
      <Col xs={12} md={2}>
        <FilterDroplist handleOnFilterTasks={handleOnFilterTasks} />
      </Col>
      <Col xs={12} md={8}>
        <SearchForm
          requestQuery={requestQuery}
          handleOnSearchTasks={handleOnSearchTasks}
        />
      </Col>
      <Col xs={12} md={2}>
        <Sort handleOnSortTasks={handleOnSortTasks} />
      </Col>
    </Row>
  );
}

function TaskRow({ task, handleOnSelectTask }) {
  return (
    <tr key={task.id} onClick={() => handleOnSelectTask(task.id)}>
      {/* a click on the tr navigates to /users/:id */}
      <td>
        <b>#{task.id}</b>
      </td>
      <td>{task.createdAt}</td>
      <td>
        <b>{task.title}</b>
        <small>
          <p>{task.description}</p>
        </small>
      </td>
      <td>{task.state}</td>
    </tr>
  );
}

function CardBody({ tasks, handleOnSelectTask }) {
  return (
    <Table striped hover bordered>
      <tbody>
        {tasks.map((task) => {
          console.log("task=", task);
          return (
            <TaskRow
              key={task.id}
              task={task}
              handleOnSelectTask={handleOnSelectTask}
            />
          );
        })}
      </tbody>
    </Table>
  );
}

function TasksList({
  tasks,
  countOpen,
  countClosed,
  handleOnSelectTask,
  handleOnSearchTasks,
  handleOnFilterTasks,
  handleOnSortTasks,
  handleIsOpenTasks,
  requestQuery,
}) {
  return (
    <Container>
      <FilterHeader
        countOpen={countOpen}
        countClosed={countClosed}
        handleIsOpenTasks={handleIsOpenTasks}
      />
      <Card>
        <Card.Header>
          <CardHeader
            requestQuery={requestQuery}
            handleOnSearchTasks={handleOnSearchTasks}
            handleOnFilterTasks={handleOnFilterTasks}
            handleOnSortTasks={handleOnSortTasks}
          />
        </Card.Header>
        <Card.Body>
          <CardBody tasks={tasks} handleOnSelectTask={handleOnSelectTask} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TasksList;
