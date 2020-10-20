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
  CardImg
} from 'reactstrap';
import { getEvent, editEvent,setIsModifiedEventLoading } from '../../actions/eventActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

class updateEvents extends Component {
  state = {
    title: '',
    dateStart: '',
    dateEnd:'',
    description: '',
    type: 'Administration',
    archived: '',
    imageData: null,
    url: '',
    selectedFile: null,
    loaded: false,
    imagePreviewUrl :''
  };

  componentDidMount() {
    this.props.setIsModifiedEventLoading();
    this.props.getEvent(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.event.title,
      dateStart: nextProps.event.dateStart,
      dateEnd: nextProps.event.dateEnd,
      description: nextProps.event.description,
      archived: nextProps.event.archived,
      type: nextProps.event.type,
      url: nextProps.event.url
    });
    if (nextProps.isModified)
    this.props.history.push('/events');
  }

  handleCancel = event => {
    this.props.history.push('/events');
  }
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
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
    }
    reader.readAsDataURL(selectedFile);
  };


   handleSubmit = (event) => {
    const newEvent = new FormData();
    if (this.state.loaded) {
      newEvent.append('imageData', this.state.selectedFile, this.state.selectedFile.name);
    } 
    newEvent.append('title', this.state.title);
    newEvent.append('dateStart', this.state.dateStart);
    newEvent.append('dateEnd', this.state.dateEnd);
    newEvent.append('description', this.state.description);
    newEvent.append('archived', this.state.archived);
    newEvent.append('type', this.state.type);
    newEvent.append('url', this.state.url);

    this.props.editEvent(newEvent, this.props.match.params.id);
  };

  render() {
    const { event } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Evénement : Image</strong>
              </CardHeader>
              <CardBody>
                <CardImg src={this.state.imagePreviewUrl ? this.state.imagePreviewUrl : `http://localhost:4000/${event.image}` } alt={event.image} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <strong> Evénement : </strong> Modifer
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
                    <FormText color="muted">Titre de l'évenement à ajouter</FormText>
                  </Col>
                </FormGroup>
                <FormGroup row>
                <Col md="3">
                  <Label htmlFor="date-input">Date Start </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    onChange={this.handleInputChange}
                    value={moment(this.state.dateStart).format('YYYY-MM-DD')}
                    type="date"
                    id="date-input"
                    name="dateStart"
                    placeholder="date debut"
                  />
                </Col>
                </FormGroup>
                <FormGroup row>


                <Col md="3">
                  <Label htmlFor="date-input">Date End </Label>
                </Col>
                <Col xs="12" md="9">
                  <Input
                    onChange={this.handleInputChange}
                    value={moment(this.state.dateEnd).format('YYYY-MM-DD')}
                    type="date"
                    id="date-input"
                    name="dateEnd"
                    placeholder="date fin"
                  />
                </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="textarea-input">description</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="textarea"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleInputChange}
                      placeholder="Description..."
                    />
                  </Col>
                </FormGroup>

                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Type :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="select"
                      name="type"
                      value={this.state.type}
                      onChange={this.handleInputChange}
                    >
                      <option disabled value="Administration">
                        veuillez choisir le type
                      </option>
                      <option value="Administration"> Administration </option>
                    <option value="Etudiant"> Etudiant </option>
                    <option value="Clubs"> Clubs </option>
                    </Input>
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Image :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="file" name="image" onChange={this.fileSelectedHandler} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
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
                    <FormText color="muted">url de l'evenement à ajouter</FormText>
                  </Col>
                </FormGroup>
                <CardFooter>
                  <center>
                    <Button type="submit" block onClick={this.handleSubmit} color="primary">
                      <i className="fa fa-dot-circle-o"></i> Modifier
                    </Button>
                    <Button type="reset" block onClick={this.handleCancel} color="danger">
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
  event: state.event.event,
  events: state.event.events,
  user: state.auth.user,
  isModified: state.event.isModified
});

export default withRouter(
  connect(
    mapStateToProps,
    { getEvent, editEvent ,setIsModifiedEventLoading}
  )(updateEvents)
);
