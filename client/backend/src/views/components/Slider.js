import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardImg, Button, Col, CardHeader, Badge } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { deleteSlider, archiveSlider, unarchiveSlider } from '../../actions/sliderActions';

class Slider extends Component {
  handleDetailsButton = id => {
    this.props.history.push('/slider/details/' + id);
  };
  handleDeleteButton = id => {
    this.props.deleteSlider(id);
  };
  handleEditButton = id => {
    this.props.history.push('/slider/update/' + id);
  };

  handleChange = (archived, id) => {
    if (archived) this.props.archiveSlider(id);
    else this.props.unarchiveSlider(id);
  };

  handleDelete = id => {
    this.props.deleteSlider(id);
  };
  render() {
    const { slider } = this.props;

    return (
      <Col xs="12" sm="8" md="4">
        <Card>
          <CardHeader>
            <b>{slider.title}</b>
            <Badge color={'warning'} className={'ml-1 mr-1'}>
              {slider.type}
            </Badge>
            <div className="card-header-actions">
              <Button
                className={'float-right'}
                color={!slider.status ? 'success' : 'danger'}
                size={'sm'}
                onClick={() => this.handleChange(slider.status, slider._id)}
              >
                {!slider.status ? 'Actif' : 'Inactif'}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Publié le <b>{moment(slider.date).format('dddd, MMMM Do YYYY, h:mm:ss a')}</b>
            </p>
            <hr className="my-2" />
            <CardImg src={`http://localhost:4000/${slider.image}`} alt={slider.image} />
            <hr className="my-2" />
            <Button onClick={() => this.handleDetailsButton(slider._id)} block color="primary">
              Details
            </Button>
            <Button onClick={() => this.handleEditButton(slider._id)} block color="warning">
              Modifier
            </Button>
            <Button onClick={() => this.handleDeleteButton(slider._id)} block color="danger">
              Supprimer
            </Button>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default withRouter(
  connect(
    mapStateToProps,
    { deleteSlider, unarchiveSlider, archiveSlider }
  )(Slider)
);
