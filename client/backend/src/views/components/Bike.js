import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, CardHeader, Card, CardBody, CardImg, Badge } from 'reactstrap';
import moment from 'moment';
import { deleteBike, archiveBike, unarchiveBike } from '../../actions/bikeActions';

class Bike extends Component {
  handleDetailsButton = id => {
    this.props.history.push('/bikes/details/' + id);
  };
  handleDeleteButton = id => {
    this.props.deleteBike(id);
  };
  handleEditButton = id => {
    this.props.history.push('/bikes/update/' + id);
  };

  handleChange = (archived, id) => {
    if (archived) this.props.unarchiveBike(id);
    else this.props.archiveBike(id);
    if (this.props.map)
      this.props.history.push('/bikes/archived');
  };

  render() {
    const { bike } = this.props;
    console.log(this.props);
    const deleteButton = (
      <Button onClick={() => this.handleDeleteButton(bike._id)} block color="danger">
        Supprimer
      </Button>
    );
    return (
      <Col xs="12" sm="8" md="4">
        <Card>
          <CardHeader>
            <b>{bike.title}</b>
            <Badge color={'warning'} className={'ml-1 mr-1'}>
              {bike.state}
            </Badge>
            <div className="card-header-actions">
              <Button
                className={'float-right'}
                color={!bike.archived ? 'success' : 'danger'}
                size={'sm'}
                onClick={() => this.handleChange(bike.archived, bike._id)}
              >
                {!bike.archived ? 'Archive' : 'Unarchive'}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Poids :     {bike.weight} <br/>
              Etat :     {bike.etat}<br/>
              Disponibilité :     {bike.disponibilite}<br/>
              Type :     {bike.type}<br/>

            </p>
            <hr className="my-2" />
            <CardImg src={bike.image?`http://localhost:4000/${bike.image}`:"http://localhost:4000/uploads/318x180.svg"} alt={bike.image} />
            <hr className="my-2" />
            <Button onClick={() => this.handleDetailsButton(bike._id)} block color="primary">
              Details
            </Button>
            <Button onClick={() => this.handleEditButton(bike._id)} block color="warning">
              Modifier
            </Button>
            {!bike.archived ? '' : deleteButton}
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
    { deleteBike, archiveBike, unarchiveBike }
  )(Bike)
);
