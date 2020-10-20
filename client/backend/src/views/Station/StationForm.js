import React, { Component } from "react";
import {
  Card,
  CardBody,
  Input,
  CardHeader,
  Col,
  FormGroup,
  Label,
  CardFooter,
  Button,
  FormText,
  InputGroup,
  Row
} from "reactstrap";
import { addStation } from "../../actions/stationActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class stationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      alt: "",
      lng: "",
      loaded: false,
      numberOfBikesCapacity: 0,
      numberOfBikesAvailable: 0,
      imageData: null,
      selectedFile: null,
      etat: "Disponible"
    };
  }

  handlerCancel = e => {
    this.setState({
      title: "",
      alt: "",
      lng: "",
      imageData: null,
      selectedFile: null,
      loaded: false,
      numberOfBikesCapacity: 0,
      numberOfBikesAvailable: 0,
      etat: ""
    });
  };

  handleLocation = e => {
    this.setState({
      location: { ...this.state.location, [e.target.name]: e.target.value }
    });
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: true
    });
  };

  handleSubmit = event => {
    const newStation = new FormData();
    if (this.state.loaded) {
      newStation.append(
        "imageData",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    newStation.append("title", this.state.title);
    newStation.append("alt", this.state.alt);
    newStation.append("lng", this.state.lng);
    newStation.append(
      "numberOfBikesCapacity",
      this.state.numberOfBikesCapacity
    );
    newStation.append(
      "numberOfBikesAvailable",
      this.state.numberOfBikesAvailable
    );

    newStation.append("etat", this.state.etat);
    newStation.append("user", this.props.user.id._id);
    newStation.append("archived", false);
    this.props.addStation(newStation);
    this.props.history.push("/stations");
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Card>
            <CardHeader>
              <strong> Station : </strong> Ajouter
            </CardHeader>
            <CardBody>
              <FormGroup row>
                <Col md="8">
                  <Label htmlFor="text-input">Titre :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                    placeholder="Titre..."
                  />
                  <FormText color="muted">
                    Titre de la station à ajouter
                  </FormText>
                </Col>

                <Col md="8">
                  <Label htmlFor="text-input">Location : </Label>
                </Col>
                <Col xs="6" md="9">
                  <Input
                    type="text"
                    name="alt"
                    value={this.state.alt}
                    onChange={this.handleInputChange}
                    placeholder="Altitude..."
                  />
                </Col>
                <Col xs="6" md="9">
                  <Input
                    type="text"
                    name="lng"
                    value={this.state.lng}
                    onChange={this.handleInputChange}
                    placeholder="Longitude..."
                  />
                </Col>

                <Col xs="6" md="9">
                  <Label htmlFor="text-input">Capacité :</Label>

                  <Input
                    name="numberOfBikesCapacity"
                    value={this.state.numberOfBikesCapacity}
                    onChange={this.handleInputChange}
                    type="number"
                  // placeholder="text..."
                  />
                </Col>

                <Col xs="6" md="9">
                  <Label htmlFor="text-input">Disponibilité :</Label>

                  <Input
                    name="numberOfBikesAvailable"
                    value={this.state.numberOfBikesAvailable}
                    onChange={this.handleInputChange}
                    type="number"
                  // placeholder="text..."
                  />
                </Col>

                <Col md="8">
                  <Label htmlFor="text-input">Etat :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="etat"
                    value={this.state.etat}
                    onChange={this.handleInputChange}
                  >
                    <option disabled>
                      Veuillez préciser l'état de la station
                    </option>
                    <option value="Disponible"> Disponible </option>
                    <option value="Maintenance"> Maintenance </option>
                    <option value="NonDispo"> Non Disponible </option>
                  </Input>
                </Col>

                <Col md="8">
                  <Label htmlFor="text-input">Image :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="file"
                    name="type"
                    onChange={this.fileSelectedHandler}
                  />
                </Col>
                {/* <Col md="8">
                  <Label htmlFor="text-input">Url :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    name="url"
                    value={this.state.url}
                    onChange={this.handleInputChange}
                    type="text"
                    placeholder="text..."
                  />
                  <FormText color="muted">
                    url de l'evenement à ajouter
                  </FormText>
                </Col> */}
              </FormGroup>
              <CardFooter>
                <InputGroup>
                  <Button
                    type="submit"
                    className="m-2"
                    onClick={this.handleSubmit}
                    color="primary"
                  >
                    <i className="fa fa-dot-circle-o"></i> Ajouter
                  </Button>
                  <Button
                    type="reset"
                    className="m-2"
                    onClick={this.handlerCancel}
                    color="danger"
                  >
                    <i className="fa fa-ban"></i> Annuler
                  </Button>
                </InputGroup>
              </CardFooter>
            </CardBody>
          </Card>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  station: state.station
});

export default withRouter(
  connect(mapStateToProps, { addStation })(stationForm)
);
