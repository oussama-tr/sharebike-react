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
  FormText
} from 'reactstrap';
import { addSlider } from '../../actions/sliderActions';
import { connect } from 'react-redux';

class addSliders extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      titleDescription: '',
      status: true,
      selectedImage: null,
      btnName:null,
      url: '',
      image: null
    };
  }

  handleSubmit = slider => {
    const newArticle = new FormData();
    try {
    if(this.state.imageLoaded)
    newArticle.append('image', this.state.selectedImage,this.state.selectedImage.name);
    newArticle.append('title', this.state.title);
    newArticle.append('description', this.state.description);
    newArticle.append('titleDescription', this.state.titleDescription);
    newArticle.append('btnName', this.state.btnName);
    newArticle.append('status', this.state.status);
    newArticle.append('url', this.state.url);
    this.props.addSlider(newArticle);
    this.props.history.push("/slider");
    } catch (error) {
      console.log(error);
    }
  };

  handlerCancel = e => {
    this.setState({
      title: '',
      description: '',
      titleDescription: '',
      image: null,
      selectedImage: null,
      btnName:null,
      url: '',
      image: null

    });
  };

  handleInputChange = slider => {
    this.setState({
      [slider.target.name]: slider.target.value
    });
  };

  imageSelectedHandler = slider => {
    this.setState({
      selectedImage: slider.target.files[0],
      imageLoaded: true
    });
  };

  render() {
    return (
      <Card>
        <CardHeader>
          <strong> Slider : </strong> Ajouter
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
              <FormText color="muted">Titre du slider à ajouter</FormText>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">description Principale</Label>
            </Col>
            <Col xs="12" md="9">
              <Input
                type="textarea"
                name="titleDescription"
                value={this.state.titleDescription}
                onChange={this.handleInputChange}
                placeholder="Description..."
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md="3">
              <Label htmlFor="textarea-input">description secondaire</Label>
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
                placeholder="Nom du bouton .."
              />
              <FormText color="muted">nom du buton du slider à ajouter</FormText>
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
                placeholder="url..."
              />
              <FormText color="muted">url du slider à ajouter</FormText>
            </Col>
          </FormGroup>
          <CardFooter>
            <center>
              <Button type="submit" size="sm" onClick={this.handleSubmit} color="primary">
                <i className="fa fa-dot-circle-o"></i> Ajouter
              </Button>
              <Button type="reset" size="sm" onClick={this.handlerCancel} color="danger">
                <i className="fa fa-ban"></i> Annuler
              </Button>
            </center>
          </CardFooter>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  slider: state.slider
});

export default connect(
  mapStateToProps,
  { addSlider }
)(addSliders);
