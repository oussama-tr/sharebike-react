import React, { Component } from 'react';
import { connect } from 'react-redux';
import Bike from '../components/Bike';
import { getBikes } from '../../actions/bikeActions';

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

class archivedBikes extends Component {
  state = {
    bikes: [],
    search: '',
    type: ''
  };

  componentDidMount() {
    this.props.getBikes();
  }

  handleUnarchivedBikesButton = () => {
    this.props.history.push('/bikes/');
  };


  handleInputChange = bike => {
    this.setState({
      [bike.target.name]: bike.target.value
    });
  };

  render() {
    const { bikes } = this.props.bike;

    let allBikes = bikes.filter(bike => {
      return bike.archived === true;
    });

    if (this.state.search !== '') {
      allBikes = allBikes.filter(bike => {
        return bike.title.indexOf(this.state.search) !== -1;
      });
    }
    if (this.state.type !== '') {
      allBikes = allBikes.filter(bike => {
        return bike.type.indexOf(this.state.type) !== -1;
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
                        <Button onClick={this.handleUnarchivedBikesButton} block color="danger" outline>
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
                    : allBikes.map((bike, index) => <Bike key={index} bike={bike} />)}
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
  bike: state.bike,
  loading: state.bike.loading
});

export default connect(
  mapStateToProps,
  { getBikes }
)(archivedBikes);
