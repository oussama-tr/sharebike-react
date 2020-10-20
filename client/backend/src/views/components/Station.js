import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, CardHeader, Card, CardBody, CardImg, Badge } from 'reactstrap';
import moment from 'moment';
import { deleteStation, archiveStation, unarchiveStation } from '../../actions/stationActions';

class Station extends Component {
  handleDetailsButton = id => {
    this.props.history.push('/stations/details/' + id);
  };
  handleDeleteButton = id => {
    this.props.deleteStation(id);
  };
  handleEditButton = id => {
    this.props.history.push('/stations/update/' + id);
  };

  handleChange = (archived, id) => {
    if (archived) this.props.unarchiveStation(id);
    else this.props.archiveStation(id);
  };

  render() {
    const { station } = this.props;
    const deleteButton = (
      <Button onClick={() => this.handleDeleteButton(station._id)} block color="danger">
        Supprimer
      </Button>
    );
    return (
      <Col xs="12" sm="8" md="4">
        <Card>
          <CardHeader>
            <b>{station.title}</b>
            <Badge color={'warning'} className={'ml-1 mr-1'}>
              {station.state}
            </Badge>
            <div className="card-header-actions">
              <Button
                className={'float-right'}
                color={!station.archived ? 'success' : 'danger'}
                size={'sm'}
                onClick={() => this.handleChange(station.archived, station._id)}
              >
                {!station.archived ? 'Archive' : 'Unarchive'}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Nombre de vélos:     {station.numberOfBikesCapacity} <br/>
              Vélos disponibles :     {station.numberOfBikesAvailable}
            </p>
            <hr className="my-2" />
            <CardImg src={station.image?`http://localhost:4000/${station.image}`:"http://localhost:4000/uploads/318x180.svg"} alt={station.image} />
            <hr className="my-2" />
            <Button onClick={() => this.handleDetailsButton(station._id)} block color="primary">
              Details
            </Button>
            <Button onClick={() => this.handleEditButton(station._id)} block color="warning">
              Modifier
            </Button>
            {!station.archived ? '' : deleteButton}
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
    { deleteStation, archiveStation, unarchiveStation }
  )(Station)
);
