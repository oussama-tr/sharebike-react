import React, { Component } from 'react';
import { getSlider } from "../../actions/sliderActions";
import { connect } from "react-redux";
import { Card, CardImg,CardBody, CardHeader, Badge, Col, Row } from 'reactstrap';

 class detailsSlider extends Component {

   

    state = {
        title  : 'undefined'
    }

    componentDidMount() {
        this.props.getSlider(this.props.match.params.id);
    }
    componentWillReceiveProps(nextProps) {
        console.log(nextProps.slider.slider)
        this.setState({
            title : nextProps.slider.title
        })
    }
    
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
                    <i className="fa fa-align-justify"></i> Slider <small>Détails</small>
                    <div className="card-header-actions">
                      <Badge>{slider.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <div id="exampleAccordion" data-children=".item">
                      <div className="item">
                        <h5> Titre :</h5>
    
                        <p className="mb-3">{slider.title}</p>
                      </div>
                      <div className="item">
                        <h5>Date Enregistrement :</h5>
    
                        <p className="mb-3">{slider.date}</p>
                      </div>
                      <div className="item">
                        <h5>Description principale:</h5>
    
                        <p className="mb-3">{slider.titleDescription}</p>
                      </div>
                      <div className="item">
                        <h5>Description secondaire:</h5>
    
                        <p className="mb-3">{slider.description}</p>
                      </div>
                      <div className="item">
                        <h5>Nom du bouton:</h5>

                        <p className="mb-3">{slider.btnName}</p>
                      </div>
                      <div className="item">
                        <h5>Url :</h5>
    
                        <p className="mb-3">{slider.url}</p>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    errors: state.errors,
    slider: state.slider.slider,
  });
  
  export default connect(
    mapStateToProps,
    { getSlider }
  )(detailsSlider);
