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
import { addBike } from "../../actions/bikeActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getStations } from "./../../actions/stationActions";

class bikeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      loaded: false,
      imageData: null,
      selectedFile: null,
      etat: "Saine",
      weight: 0,
      disponibilite: "Disponible",
      type: "honda",
      stationID: 0,

    };
  }

  handlerCancel = e => {
    this.setState({
      title: "",
      imageData: null,
      selectedFile: null,
      loaded: false,
      weight: 0,
      etat: "",
      disponibilite: "",
      type: "",

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
    const newBike = new FormData();
    if (this.state.loaded) {
      newBike.append(
        "imageData",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    }
    newBike.append("title", this.state.title);

    newBike.append(
      "etat",
      this.state.etat
    );

    newBike.append(
      "disponibilite",
      this.state.disponibilite
    );

    newBike.append(
      "type",
      this.state.type
    );

    newBike.append(
      "weight",
      this.state.weight
    );
    newBike.append("user", this.props.user.id);
    // newBike.append("station", this.props.station.id);

    newBike.append("archived", false);

    this.props.addBike(newBike);
    this.props.history.push("/bikes");
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Card>
            <CardHeader>
              <strong> Bike : </strong> Ajouter
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
                    Titre du vélo à ajouter
                  </FormText>
                </Col>

                <Col md="8">
                  <Label htmlFor="text-input">Station :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="stationID"
                    value={this.state.stationID}
                    onChange={this.handleInputChange}
                  >
                    <option disabled>veuillez choisir le type</option>
                    <option value="Administration">Administration </option>
                    <option value="Etudiant"> Etudiant </option>
                    <option value="Clubs"> Clubs </option>
                  </Input>
                </Col>


                <Col xs="6" md="9">
                  <Label htmlFor="text-input">Poids :</Label>

                  <Input
                    name="weight"
                    value={this.state.weight}
                    onChange={this.handleInputChange}
                    type="number"
                  // placeholder="text..."
                  />
                </Col>


                <Col md="8">
                  <Label htmlFor="text-input">Type :</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    type="select"
                    name="type"
                    value={this.state.type}
                    onChange={this.handleInputChange}
                  >
                    <option disabled>
                      Veuillez préciser le type du vélo
                    </option>
                    <option value="honda">honda</option>
                    <option value="bmw">bmw</option>
                    <option value="golf">golf</option>

                  </Input>
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
                      Veuillez préciser l'état du vélo
                    </option>
                    <option value="Saine"> Saine </option>
                    <option value="Maintenance"> Maintenance </option>
                  </Input>
                </Col>


                <Col xs="6" md="9">
                  <Label htmlFor="text-input">Disponibilité :</Label>

                  <Input
                    name="disponibilite"
                    value={this.state.disponibilite}
                    onChange={this.handleInputChange}
                    type="select"
                  // placeholder="text..."
                  >
                    <option disabled>
                      Veuillez préciser la disponibilité du vélo
                    </option>
                    <option value="Disponible"> Disponible </option>
                    <option value="Reservée"> Reservée </option>
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
  bike: state.bike,
  stations: state.station.stations
});

export default withRouter(
  connect(mapStateToProps, { addBike })(bikeForm)
);
