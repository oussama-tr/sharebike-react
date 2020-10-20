import React, { Component } from 'react';
import { connect } from 'react-redux';
import Event from '../components/Event';
import { getEvents } from '../../actions/eventActions';

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Button,
  Form,
  InputGroupAddon,
  InputGroup,
  FormGroup,
  Input
} from 'reactstrap';
import 'toasted-notes/src/styles.css';

class archivedEvents extends Component {
  state = {
    events: [],
    search: '',
    type: ''
  };

  componentDidMount() {
    this.props.getEvents();
  }

  handleUnarchivedEventsButton = () => {
    this.props.history.push('/events/');
  };


  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { events } = this.props.event;

    let allEvents = events.filter(event => {
      return event.archived === true;
    });

    if (this.state.search !== '') {
      allEvents = allEvents.filter(event => {
        return event.title.indexOf(this.state.search) !== -1;
      });
    }
    if (this.state.type !== '') {
      allEvents = allEvents.filter(event => {
        return event.type.indexOf(this.state.type) !== -1;
      });
    }

    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <Form action="" method="post" className="form-horizontal">
                  <FormGroup row>
                    <Col md="4" sm="4">
                      <InputGroup className="mt-2">
                        <InputGroupAddon addonType="prepend">
                          <Button  type="button" color="primary">
                            Recherche:
                          </Button>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          id="input1-group2"
                          value={this.state.search}
                          name="search"
                          placeholder="Inserer un titre"
                          onChange={this.handleInputChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md="4" sm="4">
                      <InputGroup className="mt-2">
                        <InputGroupAddon addonType="prepend">
                          <Button  type="button" color="primary">
                            Type:
                          </Button>
                        </InputGroupAddon>
                        <Input
                          type="select"
                          value={this.state.type}
                          name="type"
                          placeholder="Inserer un titre"
                          onChange={this.handleInputChange}
                        >
                          <option value="">veuillez choisir le type</option>
                          <option value="sportif">Sportif</option>
                          <option value="autres">Autres</option>
                        </Input>
                      </InputGroup>
                    </Col>
                    </FormGroup>
                    <FormGroup row >
                    <Col md="4" sm="4">
                      <InputGroup className="mt-2">
                        <Button onClick={this.handleUnarchivedEventsButton} block color="danger" outline>
                          <i className="fa fa-plus" />
                          &nbsp;Evenements Non Archiveés
                        </Button>
                      </InputGroup>
                    </Col>
                  </FormGroup>
                </Form>
              </CardHeader>
              <CardBody>
                <Row>
                  {this.props.loading
                    ? 'Loading...'
                    : allEvents.map((event, index) => <Event key={index} event={event} />)}
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  event: state.event,
  loading: state.event.loading
});

export default connect(
  mapStateToProps,
  { getEvents }
)(archivedEvents);
