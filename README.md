# Task Tracker Application

This project implements the frontend of my task's tracker system. The web-based frontend communicates
with the [Task Tracker Backend](https://github.com/tomwey2/task-tracker-backend-rest-spring-mongodb) via
REST api.

The Task Tracker Application is a simple task tracking system that allows the user to manage and
maintain lists of tasks. The application contains the following functions:
- login and register user
- show tasks that the logged-in user has reported or that the logged-in user is assigned to
- filter the tasks (see below)
- select and show one task from the list of tasks
- edit a selected task
- close or reopen a selected task
- assign the task to other users
- pin labels to the selected task

## Application model
The following picture shows the model of the application.

![Model of the application](model.png)

## Filtering Tasks
The list of tasks can be reduced by a filter. The following filters are allowed:
- is:open - show all tasks that are open
- is:closed - show all tasks that are closed
- assignee:@me - show only tasks that are assigned to the logged-in user
- assignee:{user} - show only tasks that are assigned to the {user}
- a combination of is: and assignee: filter

> Important: a user can only see the tasks that he/she has reported or he/she is assigned to. Exception is a logged-in user with role ADMIN. This user can see all tasks.

## Usage

Run the application:

    npm start

This command runs the application in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Run the application tests:

    npm test

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

Build the application for deployment:

    npm run build

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Information about the used frameworks
Further information you can find at:
- [React documentation](https://reactjs.org/).
- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).
- [Making a progressive web app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)
- [Advanced configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)
-[Deployment](https://facebook.github.io/create-react-app/docs/deployment)
- [Bootstrap 5](https://getbootstrap.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios HTTP Client](https://github.com/axios/axios)
- [React-Router-Dom](https://github.com/remix-run/react-router)
