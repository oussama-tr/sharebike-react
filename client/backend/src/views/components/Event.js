import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Col, CardHeader, Card, CardBody, CardImg, Badge } from 'reactstrap';
import moment from 'moment';
import { deleteEvent, archiveEvent, unarchiveEvent } from '../../actions/eventActions';

class Event extends Component {
  handleDetailsButton = id => {
    this.props.history.push('/events/details/' + id);
  };
  handleDeleteButton = id => {
    this.props.deleteEvent(id);
  };
  handleEditButton = id => {
    this.props.history.push('/events/update/' + id);
  };

  handleChange = (archived, id) => {
    if (archived) this.props.unarchiveEvent(id);
    else this.props.archiveEvent(id);
  };

  render() {
    const { event } = this.props;
    const deleteButton = (
      <Button onClick={() => this.handleDeleteButton(event._id)} block color="danger">
        Supprimer
      </Button>
    );
    return (
      <Col xs="12" sm="8" md="4">
        <Card>
          <CardHeader>
            <b>{event.title}</b>
            <Badge color={'warning'} className={'ml-1 mr-1'}>
              {event.type}
            </Badge>
            <div className="card-header-actions">
              <Button
                className={'float-right'}
                color={!event.archived ? 'success' : 'danger'}
                size={'sm'}
                onClick={() => this.handleChange(event.archived, event._id)}
              >
                {!event.archived ? 'Archive' : 'Unarchive'}
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <p>
              Du <b>{moment(event.dateStart).format('YYYY-MM-DD')}</b> jusqu'à{' '}
              <b>{moment(event.dateEnd).format('YYYY-MM-DD')}</b>{' '}
            </p>
            <hr className="my-2" />
            <CardImg src={`http://localhost:4000/${event.image}`} alt={event.image} />
            <hr className="my-2" />
            <Button onClick={() => this.handleDetailsButton(event._id)} block color="primary">
              Details
            </Button>
            <Button onClick={() => this.handleEditButton(event._id)} block color="warning">
              Modifier
            </Button>
            {!event.archived ? '' : deleteButton}
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
    { deleteEvent, archiveEvent, unarchiveEvent }
  )(Event)
);
