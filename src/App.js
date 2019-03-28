import React, { Component } from "react";
import "./App.css";
import swal from "sweetalert";
// import logo from "./logo.svg";
import networking from "./networking.svg";

import {
  Table,
  Button,
  Form,
  Col,
  Row,
  Jumbotron,
  Container,
  Navbar,
  Nav,
  Alert,
  ProgressBar
} from "react-bootstrap";

class App extends Component {
  constructor() {
    super();

    this.state = {
      h1Text_One: "Hello World",
      h1Text_Two: "Hello Pakistan",
      h1Text_Status: true,
      userEmail: "",
      adminEmail: "admin@domain.com",
      userPassword: "",
      adminPassword: "123456",
      user: false,
      addForm: false,
      editForm: false,
      empl_Details: [
        {
          Serial: 1,
          First_Name: "Muhammad",
          Last_Name: "Yousuf",
          Email: "myousuf@gmail.com",
          Salary: "30000",
          Job_Start_Date: "30 March, 2019"
        },
        {
          Serial: 2,
          First_Name: "Tariq",
          Last_Name: "Soomro",
          Email: "tariq@hotmail.com",
          Salary: "55000",
          Job_Start_Date: "30 June, 2019"
        }
      ],
      new_empl_Details: {}
    };
  }

  h1Text() {
    const status = this.state.h1Text_Status;
    this.setState({ h1Text_Status: !status });
  }

  login() {
    const { userEmail, adminEmail, userPassword, adminPassword } = this.state;
    return userEmail.toLowerCase() === adminEmail &&
      userPassword === adminPassword
      ? swal({
          title: "Good job!",
          text: "You successfully signed-in Admin Account!",
          icon: "success",
          button: "Continue..."
        }).then(() => {
          this.setState({ user: true, userEmail: "", userPassword: "" });
        })
      : swal({
          title: "Ohh No!",
          text: "Your input credentials not matched in our database!",
          icon: "error",
          button: "Try Again!"
        });
  }

  logOut() {
    swal({
      title: "Are you sure?",
      text: "Once Logout done, you will have to login again to continue!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(log_out => {
      if (log_out) {
        swal("Logout!", {
          icon: "success"
        }).then(() => {
          this.setState({ user: false });
        });
      } else {
        swal("You are safe!");
      }
    });
  }

  edit(key) {
    const { empl_Details } = this.state;
    const data = {};
    empl_Details.map(item => {
      if (item.Serial === key) {
        data.Serial = item.Serial;
        data.First_Name = item.First_Name;
        data.Last_Name = item.Last_Name;
        data.Email = item.Email;
        data.Salary = item.Salary;
        data.Job_Start_Date = item.Job_Start_Date;
      }
      return ""
    });
    this.setState({ editData: data, editForm: true });
  }

  deleteItem(key) {
    const { empl_Details } = this.state;
    empl_Details.map((item, index) => {
      if (item.Serial === key) {
        swal({
          title: "Are you sure?",
          text: "You want to DELETE this item?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
          closeOnClickOutside: false,
          closeOnEsc: false
        }).then(deleteThis => {
          if (deleteThis) {
            swal("Deleted!", {
              icon: "success"
            }).then(() => {
              empl_Details.splice(index, 1);
              this.setState({ empl_Details });
            });
          }
        });
      }
      return ""
    });
  }

  loginForm() {
    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1>Sign In</h1>
            <p>
              Please Sign in with admin email and Password. <br />
              Email: <code>admin@domain.com</code>
              <br />
              Password: <code>123456</code>
            </p>
          </Container>
        </Jumbotron>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={e => {
            this.setState({ userEmail: e.target.value });
          }}
        />
        <br />
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={e => {
            this.setState({ userPassword: e.target.value });
          }}
        />
        <br />
        <Button
          variant="success"
          size="lg"
          onClick={() => {
            this.login();
          }}
          style={{ float: "right" }}
        >
          Login
        </Button>
      </div>
    );
  }

  showTable() {
    const { empl_Details, h1Text_Status, h1Text_One, h1Text_Two } = this.state;

    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1 onClick={this.h1Text.bind(this)}>
              {h1Text_Status ? h1Text_One : h1Text_Two}
            </h1>
            <p>
              <code>Click on Heading to see Magic!</code>
            </p>
          </Container>
        </Jumbotron>

        {empl_Details.length === 0 ? (
          <div>
            <Alert variant="danger">
              <Alert.Heading>
                Oh snap! Your Employee Data is Empty!
              </Alert.Heading>
              <p>
                Click below <code>Add New</code> Button to create new Employee
                Data and render on this Page.
              </p>
            </Alert>
            <ProgressBar>
              <ProgressBar striped variant="success" now={25} key={1} />
              <ProgressBar striped variant="warning" now={25} key={2} />
              <ProgressBar striped variant="danger" now={25} key={3} />
              <ProgressBar striped variant="info" now={25} key={4} />
            </ProgressBar>
            <br />
          </div>
        ) : (
          <Table responsive striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Sr</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Salary</th>
                <th>Job Start Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {empl_Details.map((item, index) => {
                return (
                  <tr key={item.Serial + "_" + new Date()}>
                    <td>{index + 1}</td>
                    <td>{item.First_Name}</td>
                    <td>{item.Last_Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Salary}</td>
                    <td>{item.Job_Start_Date}</td>
                    <td>
                      <Button
                        variant="warning"
                        block
                        onClick={() => {
                          this.edit(item.Serial);
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        block
                        onClick={() => {
                          this.deleteItem(item.Serial);
                        }}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
        <Button
          variant="primary"
          size="lg"
          onClick={() => {
            this.setState({ addForm: true });
          }}
          style={{ float: "right" }}
        >
          Add New
        </Button>
      </div>
    );
  }

  addEmployeeForm() {
    const { empl_Details } = this.state;
    const newIndex = empl_Details.length + 1;
    const d = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const jobStartDate =
      d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
    const data = { Serial: newIndex, Job_Start_Date: jobStartDate };
    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1>Add Employee Details:</h1>
          </Container>
        </Jumbotron>
        <div>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                First Name:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="First Name..."
                  onChange={e => {
                    data.First_Name = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Last Name:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder="Last Name..."
                  onChange={e => {
                    data.Last_Name = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Email:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder="Email ID..."
                  onChange={e => {
                    data.Email = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Salary:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder="Salary..."
                  onChange={e => {
                    data.Salary = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Job Start Date:
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={jobStartDate} />
              </Col>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              empl_Details.push(data);
              swal({
                title: "Good job!",
                text: "You successfully added New Employee Data!",
                icon: "success",
                button: "Return to Employee Sheet..."
              }).then(() => {
                this.setState({ empl_Details, addForm: false });
              });
            }}
            style={{ float: "right" }}
          >
            محفوظ کریں
          </Button>
        </div>
      </div>
    );
  }

  editEmployeeForm() {
    const { editData, empl_Details } = this.state;
    const d = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const jobStartDate =
      d.getDate() + " " + months[d.getMonth()] + ", " + d.getFullYear();
    const newData = { Serial: editData.Serial, Job_Start_Date: jobStartDate };
    return (
      <div>
        <Jumbotron fluid>
          <Container>
            <h1>Edit Employee Details:</h1>
          </Container>
        </Jumbotron>
        <div>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="2">
                First Name:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={editData.First_Name}
                  onChange={e => {
                    newData.First_Name = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Last Name:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={editData.Last_Name}
                  onChange={e => {
                    newData.Last_Name = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Email:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder={editData.Email}
                  onChange={e => {
                    newData.Email = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Salary:
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder={editData.Salary}
                  onChange={e => {
                    newData.Salary = e.target.value;
                  }}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="2">
                Job Start Date:
              </Form.Label>
              <Col sm="10">
                <Form.Control plaintext readOnly defaultValue={jobStartDate} />
              </Col>
            </Form.Group>
          </Form>
          <Button
            variant="primary"
            size="lg"
            onClick={() => {
              empl_Details.map((item, index) => {
                if (item.Serial === editData.Serial) {
                  empl_Details.splice(index, 1);
                  empl_Details.push(newData);
                  swal({
                    title: "Edit Done!",
                    text: "You successfully edited Employee Data!",
                    icon: "success",
                    button: "Return to Employee Sheet..."
                  }).then(() => {
                    this.setState({ empl_Details, editForm: false });
                  });
                }
                return ""
              });
            }}
            style={{ float: "right" }}
          >
            محفوظ کریں
          </Button>
        </div>
      </div>
    );
  }

  render() {
    const { user, addForm, editForm } = this.state;
    return (
      <Container className="mainContainer">
        <Navbar bg="dark" variant="dark" sticky="top">
          <Navbar.Brand href="void:0">
            <img
              alt=""
              src={networking}
              width="35"
              height="35"
              className="App-logo d-inline-block align-top"
            />
            {" Gharana Pakistan"}
          </Navbar.Brand>
          <Nav className="mr-auto" />
          {user && (
            <Form inline>
              <Button variant="outline-danger" onClick={this.logOut.bind(this)}>
                Logout
              </Button>
            </Form>
          )}
        </Navbar>
        {!user && this.loginForm()}
        {user && !addForm && !editForm && this.showTable()}
        {user && addForm && !editForm && this.addEmployeeForm()}
        {user && !addForm && editForm && this.editEmployeeForm()}
      </Container>
    );
  }
}

export default App;
