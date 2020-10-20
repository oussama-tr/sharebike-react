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
  Row,
  CardImg
} from "reactstrap";
import {
  getStation,
  editStation,
  setIsModifiedStationLoading
} from "../../actions/stationActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";

class updateStations extends Component {
  state = {
    title: "",
    location: { alt: "", lng: "" },
    loaded: false,
    numberOfBikesCapacity: 0,
    numberOfBikesAvailable: 0,
    imageData: null,
    selectedFile: null,
    etat: "Disponible"
  };

  componentDidMount() {
    this.props.setIsModifiedStationLoading();
    this.props.getStation(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.station.title,
      location: nextProps.station.location,
      numberOfBikesCapacity: nextProps.station.numberOfBikesCapacity,
      numberOfBikesAvailable: nextProps.station.numberOfBikesAvailable,
      archived: nextProps.station.archived,
      etat: nextProps.station.etat
    });
    if (nextProps.isModified) this.props.history.push("/stations");
  }

  handleCancel = station => {
    this.props.history.push("/stations");
  };
  handleInputChange = station => {
    this.setState({
      [station.target.name]: station.target.value
    });
  };

  handleLocation = station => {
    this.setState({
      location: {
        ...this.state.location,
        [station.target.name]: station.target.value
      }
    });
  };

  fileSelectedHandler = event => {
    event.preventDefault();
    let reader = new FileReader();
    let selectedFile = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile,
        imagePreviewUrl: reader.result,
        loaded: true
      });
    };
    reader.readAsDataURL(selectedFile);
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
    newStation.append("location", this.state.location);
    newStation.append(
      "numberOfBikesCapacity",
      this.state.numberOfBikesCapacity
    );
    newStation.append(
      "numberOfBikesAvailable",
      this.state.numberOfBikesAvailable
    );
    newStation.append("archived", this.state.archived);
    newStation.append("etat", this.state.etat);

    this.props.editStation(newStation, this.props.match.params.id);
  };

  render() {
    const { station } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Station : Image</strong>
              </CardHeader>
              <CardBody>
                <CardImg
                  src={
                    this.state.imagePreviewUrl
                      ? this.state.imagePreviewUrl
                      : `http://localhost:4000/${station.image}`
                  }
                  alt={station.image}
                />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <strong> Station : </strong> Modifer
              </CardHeader>
              <CardBody>
                <FormGroup row>
                  <Col md="3">
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
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Location : </Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      name="alt"
                      value={this.state?.location?.alt}
                      onChange={this.handleLocation}
                      placeholder="Altitude..."
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col xs="12" md="9">
                    <Input
                      type="text"
                      name="lng"
                      value={this.state?.location?.lng}
                      onChange={this.handleLocation}
                      placeholder="Longitude..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">Capacité :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      name="numberOfBikesCapacity"
                      value={this.state.numberOfBikesCapacity}
                      onChange={this.handleInputChange}
                      type="number"
                      // placeholder="text..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Disponibilité :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      name="numberOfBikesAvailable"
                      value={this.state.numberOfBikesAvailable}
                      onChange={this.handleInputChange}
                      type="number"
                      // placeholder="text..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
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
                      <option value="Non Disponible"> Non Disponible </option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Image :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="file"
                      name="image"
                      onChange={this.fileSelectedHandler}
                    />
                  </Col>
                </FormGroup>
                <CardFooter>
                  <center>
                    <Button
                      type="submit"
                      block
                      onClick={this.handleSubmit}
                      color="primary"
                    >
                      <i className="fa fa-dot-circle-o"></i> Modifier
                    </Button>
                    <Button
                      type="reset"
                      block
                      onClick={this.handleCancel}
                      color="danger"
                    >
                      <i className="fa fa-ban"></i> Annuler
                    </Button>
                  </center>
                </CardFooter>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  station: state.station.station,
  stations: state.station.stations,
  user: state.auth.user,
  isModified: state.station.isModified
});

export default withRouter(
  connect(mapStateToProps, {
    getStation,
    editStation,
    setIsModifiedStationLoading
  })(updateStations)
);
