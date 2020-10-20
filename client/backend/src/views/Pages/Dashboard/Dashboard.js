import React, { Component  } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardTitle,
  CardImg, Label, Input, FormText, FormGroup
} from 'reactstrap';
import 'toasted-notes/src/styles.css';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import CanvasJSReact from '../../../assets/canvasjs.react';
import {getStations} from "../../../actions/stationActions";
import {getBikes} from "../../../actions/bikeActions";
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;





class Dashboard extends Component {
  mapRef = React.createRef();

  constructor(props: Props) {
    super(props);
    this.state = {

    };
  }
  //map


  //MAP






  componentDidMount() {
    this.props.getBikes();
    this.props.getStations();

  }
  render() {
    const { bikes } = this.props.bike;
    const { stations } = this.props.station;
    var honda=0,bmw=0,golf=0;
    var dataPoints=[];
    if (!this.props.loading2){
      stations.forEach(function (station,i) {
        dataPoints[i]={y:station.bikes.length,label:station.title}
      });
      console.log(dataPoints);
    }
    if (!this.props.loading){
      bikes.forEach(function (bike,i) {
        if (bike.type==="honda")
          honda++;
        else if (bike.type==="bmw")
          bmw++;
        else
          golf++;
      });
    }
    const options2 = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "dark2", // "light1", "dark1", "dark2"
      title:{
        text: "Trip Expenses"
      },
      data: [{
        type: "pie",
        indexLabel: "{label}: {y} {label}",
        startAngle: -90,
        dataPoints: [
          { y: bmw, label: "bmw" },
          { y: golf, label: "golf" },
          { y: honda, label: "honda" },

        ]
      }]
    };



    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title:{
        text: "Simple Column Chart with Index Labels"
      },
      data: [{
        type: "column", //change type to bar, line, area, pie, etc
        //indexLabel: "{y}", //Shows y value on all Data Points
        indexLabelFontColor: "#5A5757",
        indexLabelPlacement: "outside",
        dataPoints: dataPoints
      }]
    };
    return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader style={{backgroundColor: "#00853e"}}>
                  <h2>ShareBike Dashboard</h2>
                </CardHeader>
                <CardBody  >
                  <div className='col-11'>
                    <CanvasJSChart options = {options}
                         onRef={ref => this.chart = ref}
                    />
                    <br/>
                    <CanvasJSChart options = {options2}
                        /* onRef={ref => this.chart = ref} */
                    />
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
  user: state.auth.user,
  errors: state.errors,
  bike: state.bike,
  loading: state.bike.loading,
  loading2: state.station.loading,
  station: state.station,
});
export default withRouter(
    connect(mapStateToProps,{getStations,getBikes})(Dashboard)
);
