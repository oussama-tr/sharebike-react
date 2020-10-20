import React, { Component } from 'react';
import { getAllSlider } from '../../actions/sliderActions';
import Slider from '../components/Slider';
import { connect } from 'react-redux';
import {
  FormGroup,
  Col,
  Input,
  Row,
  InputGroup,
  Button,
  CardBody,
  Card,
  CardHeader,
  InputGroupAddon,
  Form
} from 'reactstrap';

class showSlider extends Component {
  state = {
    allSlider: [],
    search: '',
    etat: false
  };

  componentDidMount() {
    this.props.getAllSlider();
  }

  handleAddRedirect = () => {
    this.props.history.push('/slider/ajouter');
  };

  handleArchivedEventsButton = () => {
    this.props.history.push('/slider/archived');
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { allSlider } = this.props.slider;

    let sliders = allSlider;
    if (this.state.search !== '') {
      sliders = sliders.filter(slider => {
        return slider.title.indexOf(this.state.search) !== -1;
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
                          <Button type="button" color="primary">
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
              
                  </FormGroup>
                  <FormGroup row>
                    <Col md="4" sm="4">
                      <InputGroup className="mt-2">
                        <Button block onClick={this.handleAddRedirect} color="success" outline>
                          <i className="fa fa-plus" />
                          &nbsp;Ajouter un slider
                        </Button>
                      </InputGroup>
                    </Col>
                    <Col md="4" sm="4">
                      <InputGroup className="mt-2">
                        <Button
                          onClick={this.handleArchivedEventsButton}
                          block
                          color="danger"
                          outline
                        >
                          <i className="fa fa-plus" />
                          &nbsp;Sliders Inactifs
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
                    : sliders.map((slider, index) => <Slider key={index} slider={slider} />)}
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
  slider: state.slider,
  loading: state.slider.loading
});

export default connect(
  mapStateToProps,
  { getAllSlider }
)(showSlider);
