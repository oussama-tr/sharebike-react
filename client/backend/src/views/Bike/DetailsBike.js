import React, { Component } from 'react';
import { Card, CardImg,CardBody, CardHeader, Badge, Col, Row } from 'reactstrap';
import moment from 'moment';
import { getBike } from '../../actions/bikeActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class detailsBike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bike: {},
      dateDebutString: null
    };
  }
  handleDetailsButton = id => {
    this.props.history.push('/stations/details/' + id);
  };

  componentDidMount() {
    this.props.getBike(this.props.match.params.id);
  }


  render() {
    const { bike } = this.props;

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
                <strong>Vélo : Image</strong>
              </CardHeader>
              <CardBody>
              <CardImg src={bike.image?`http://localhost:4000/${bike.image}`:"http://localhost:4000/uploads/318x180.svg"} alt={bike.image} />
              </CardBody>
            </Card>
          </Col>
          <Col xs="12" xl="6">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Vélo <small>Détails</small>
                <div className="card-header-actions">
                  <Badge>{bike.type}</Badge>
                </div>
              </CardHeader>
              <CardBody>
                <div id="exampleAccordion" data-children=".item">
                  <div className="item">
                    <h5 style={{color:"blueviolet"}}> Titre :</h5>

                    <p className="mb-3">{bike.title}</p>
                  </div>
                  <div className="item">
                    <h5 style={{color:"blueviolet"}}> weight :</h5>

                    <p className="mb-3">{bike.weight}</p>
                  </div>
                  <div className="item">
                    <h5 style={{color:"blueviolet"}}> Disponibilité :</h5>

                    <p style={{color:"red"}} className="mb-3">{bike.disponibilite}</p>
                  </div>
                  <div className="item">
                    <h5 style={{color:"blueviolet"}}>Date Enregistrement :</h5>

                    <p className="mb-3">{bike.createdAt}</p>
                  </div>
                  <div className="item">
                    <h5 style={{color:"blueviolet"}}> Date Debut - Date Fin :</h5>

                    <p className="mb-3">
                      Du {moment(bike.dateStart).format('MMM Do YY')} Jusqu'a{' '}
                      {moment(bike.dateEnd).format('MMM Do YY')}
                    </p>
                  </div>
                  <div className="item">
                    <h5 >Station :</h5>

                    <a href="#" onClick={() => bike.station?this.handleDetailsButton(bike.station._id):"#"} className="mb-3">{bike.station?bike.station.title:"loading"}</a>
                  </div>
                  <div className="item">
                    <h5>etat :</h5>

                    <p style={{color:"red"}} className="mb-3">{bike.etat}</p>
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
  bike: state.bike.bike
});

export default withRouter(connect(mapStateToProps,{getBike})(detailsBike));
