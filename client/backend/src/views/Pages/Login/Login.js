import React, {Component} from "react";
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {loginUser} from "../../../actions/authActions";

import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Alert
} from "reactstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      visible: false
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

   componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        message: nextProps.errors.message,
        visible: nextProps.errors.visible
      });
    }
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  };

  onDismiss = () => {
    this.setState({visible: false});
  };

  onSubmit = e => {
    e.preventDefault();
    const userData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.loginUser(userData);
  };

  render() {
    const {message, visible} = this.state;

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    {/* <Form onSubmit={e => this.connectUser(e)}> */}
                    <Form onSubmit={(e) => this.onSubmit(e)}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <p className="text-muted">
                        Login: hamdi / Password: test
                      </p>

                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={this.onChange}
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          name="username"
                          value={this.state.username}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={this.onChange}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          name="password"
                          value={this.state.password}
                        />
                      </InputGroup>
                      {visible ? (
                        <Row>
                          <Col>
                            <Alert
                              color="danger"
                              isOpen={visible}
                              toggle={this.onDismiss}
                            >
                              {message}
                            </Alert>
                          </Col>
                        </Row>
                      ) : null}
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            name="connectButton"
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{width: "44%"}}
                >
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Welcome To Electrify , Please Sign up to make a request
                        for joining the revolution of shared renewable energy.
                      </p>
                      <Link to="/register">
                        <Button
                          color="primary"
                          className="mt-3"
                          active
                          tabIndex={-1}
                        >
                          Register Now!
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {loginUser}
)(Login);
