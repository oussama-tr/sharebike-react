import React, { Component } from 'react';
import { connect } from 'react-redux';
import Station from '../components/Station';
import { getStations } from '../../actions/stationActions';

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

class archivedStations extends Component {
  state = {
    stations: [],
    search: '',
    type: ''
  };

  componentDidMount() {
    this.props.getStations();
  }

  handleUnarchivedStationsButton = () => {
    this.props.history.push('/stations/');
  };


  handleInputChange = station => {
    this.setState({
      [station.target.name]: station.target.value
    });
  };

  render() {
    const { stations } = this.props.station;

    let allStations = stations.filter(station => {
      return station.archived === true;
    });

    if (this.state.search !== '') {
      allStations = allStations.filter(station => {
        return station.title.indexOf(this.state.search) !== -1;
      });
    }
    if (this.state.type !== '') {
      allStations = allStations.filter(station => {
        return station.type.indexOf(this.state.type) !== -1;
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
                        <Button onClick={this.handleUnarchivedStationsButton} block color="danger" outline>
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
                    : allStations.map((station, index) => <Station key={index} station={station} />)}
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
  station: state.station,
  loading: state.station.loading
});

export default connect(
  mapStateToProps,
  { getStations }
)(archivedStations);
