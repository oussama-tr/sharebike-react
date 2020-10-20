import React, { Component } from 'react';
import { editSlider, getSlider, setIsModifiedSliderLoading } from '../../actions/sliderActions';
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

import { connect } from 'react-redux';

class updateslider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider: {},
      title: '',
      description: '',
      titleDescription: '',
      status: true,
      image: '',
      selectedImage: null,
      imageLoaded: false,
      btnName:null,
      url: ''
    };
  }

  componentDidMount() {
    this.props.setIsModifiedSliderLoading();
    this.props.getSlider(this.props.match.params.id);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.slider.title,
      description: nextProps.slider.description,
      titleDescription: nextProps.slider.titleDescription,
      status: nextProps.slider.status,
      image: nextProps.slider.image,
      url: nextProps.slider.url,
      btnName : nextProps.slider.btnName
    });
    if( nextProps.isModified)
    this.props.history.push('/slider');
  }

  handleSubmit = event => {
    const updateSlider = new FormData();

    if (this.state.imageLoaded) {
      updateSlider.append('image', this.state.selectedImage, this.state.selectedImage.name);
    }
    updateSlider.append('title', this.state.title);
    updateSlider.append('description', this.state.description);
    updateSlider.append('titleDescription', this.state.titleDescription);
    updateSlider.append('status', this.state.status);
    updateSlider.append('btnName', this.state.btnName);
    updateSlider.append('url', this.state.url);

    this.props.editSlider(updateSlider, this.props.match.params.id);
    this.props.history.push('/slider');
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  imageSelectedHandler = event => {
    this.setState({
      selectedImage: event.target.files[0],
      imageLoaded: true
    });
  };

 
  render() {
    const { slider } = this.props;
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Slider : Image</strong>
              </CardHeader>
              <CardBody>
                <CardImg src={`http://localhost:4000/${slider.image}`} alt={slider.image} />
              </CardBody>
            </Card>
          </Col>

          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <strong> Slider : </strong> Modifer
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
                    <FormText color="muted">Titre du slider</FormText>
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
                    <Label htmlFor="text-input">Image :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="file" name="image" onChange={this.imageSelectedHandler} />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Nom du bouton :</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      name="btnName"
                      value={this.state.btnName}
                      onChange={this.handleInputChange}
                      type="text"
                      placeholder="Nom du bouton.."
                    />
                    <FormText color="muted">Nom du bouton de l'article slider</FormText>
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
                    <FormText color="muted">url de l'article slider</FormText>
                  </Col>
                </FormGroup>
                <CardFooter>
                  <center>
                    <Button type="submit" block onClick={this.handleSubmit} color="primary">
                      <i className="fa fa-dot-circle-o"></i> Modifier
                    </Button>
                    <Button type="reset" block color="danger">
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
  user: state.auth.user,
  errors: state.errors,
  slider: state.slider.slider,
  isModified: state.slider.isModified
});

export default connect(
  mapStateToProps,
  { getSlider, editSlider, setIsModifiedSliderLoading }
)(updateslider);
