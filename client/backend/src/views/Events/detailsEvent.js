import React, { Component } from 'react';
import { Card, CardImg,CardBody, CardHeader, Badge, Col, Row } from 'reactstrap';
import moment from 'moment';
import { getEvent } from '../../actions/eventActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class detailsEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {},
      dateDebutString: null
    };
  }


  componentDidMount() {
    this.props.getEvent(this.props.match.params.id);
  }

    
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
              <CardImg src={`http://localhost:4000/${event.image}`} alt={event.image} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Evénement <small>Détails</small>
                <div className="card-header-actions">
                  <Badge>{event.type}</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div id="exampleAccordion" data-children=".item">
                  <div className="item">
                    <h5> Titre :</h5>

                    <p className="mb-3">{event.title}</p>
                  </div>
                  <div className="item">
                    <h5>Date Enregistrement :</h5>

                    <p className="mb-3">{event.createdAt}</p>
                  </div>
                  <div className="item">
                    <h5> Date Debut - Date Fin :</h5>

                    <p className="mb-3">
                      Du {moment(event.dateStart).format('MMM Do YY')} Jusqu'a{' '}
                      {moment(event.dateEnd).format('MMM Do YY')}
                    </p>
                  </div>
                  <div className="item">
                    <h5>Description :</h5>

                    <p className="mb-3">{event.description}</p>
                  </div>
                  <div className="item">
                    <h5>Url :</h5>

                    <p className="mb-3">{event.url}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  event: state.event.event
});

export default withRouter(connect(mapStateToProps,{getEvent})(detailsEvent));
