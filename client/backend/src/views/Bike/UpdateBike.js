import React, { Component } from 'react';
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
  CardImg,
  InputGroup
} from 'reactstrap';
import { getBike, editBike,setIsModifiedBikeLoading } from '../../actions/bikeActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class updateBikes extends Component {
  state = {
    title: "",
      loaded: false,
      imageData: null,
      selectedFile: null,
      etat: "Saine",
      weight: 0,
      disponibilite: "Disponible",
      type: "honda",

  };

  componentDidMount() {
    this.props.setIsModifiedBikeLoading();
    this.props.getBike(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.bike.title,
      dateStart: nextProps.bike.dateStart,
      dateEnd: nextProps.bike.dateEnd,
      description: nextProps.bike.description,
      archived: nextProps.bike.archived,
      type: nextProps.bike.type,
      url: nextProps.bike.url
    });
    if (nextProps.isModified)
    this.props.history.push('/bikes');
  }

  handleCancel = bike => {
    this.props.history.push('/bikes');
  }
  handleInputChange = bike => {
    this.setState({
      [bike.target.name]: bike.target.value
    });
  };

  fileSelectedHandler = bike => {
    bike.prbikeDefault();
    let reader = new FileReader();
    let selectedFile = bike.target.files[0];

    reader.onloadend = () => {
      this.setState({
        selectedFile,
        imagePreviewUrl: reader.result,
        loaded: true
      });
    }
    reader.readAsDataURL(selectedFile);
  };


   handleSubmit = (bike) => {
    const newBike = new FormData();
    if (this.state.loaded) {
      newBike.append('imageData', this.state.selectedFile, this.state.selectedFile.name);
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
    newBike.append("archived", false);


    this.props.editBike(newBike, this.props.match.params.id);
  };

  render() {
    const { bike } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Bike : Image</strong>
              </CardHeader>
              <CardBody>
                <CardImg src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : `http://localhost:4000/${bike.image}` } alt={bike.image} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <strong> Vélo : </strong> Modifer
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
                    <option value="Non Disponible"> Non Disponible </option>

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
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  bike: state.bike.bike,
  bikes: state.bike.bikes,
  user: state.auth.user,
  isModified: state.bike.isModified
});

export default withRouter(
  connect(
    mapStateToProps,
    { getBike, editBike ,setIsModifiedBikeLoading}
  )(updateBikes)
);
