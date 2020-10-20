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
import './Dashboard.css'
import mapboxgl from 'mapbox-gl'
import {
  addStation,
  archiveStation,
  editStation,
  getStations,
  setIsModifiedStationLoading, unarchiveStation
} from "../../actions/stationActions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';


var map;

class MapStation extends Component {
  mapRef = React.createRef();

  constructor(props: Props) {
    super(props);
    this.props.getStations();
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
      loaded:false,
      modal:false,
      file: "http://localhost:4000/uploads/318x180.svg",
      title: "",
      alt: "",
      lang: "",
      numberOfBikesCapacity: 0,
      numberOfBikesAvailable: 0,
      imageData: null,
      selectedFile: null,
      etat: "Disponible",
      archived:false,
      mode : "add"

    };
    this.toggleModal = this.toggleModal.bind(this);
  }
  //map
  flyToStore=(station,map)=> {
    map.flyTo({
      center: [station.lng,station.alt],
      zoom: 15
    });
  };
   createPopUp =(marker,map,myInstance)=> {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
     var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([marker.lng,marker.alt])
        .setHTML('<h3>Sweetgreen</h3>' +
            '<image center  width="100%" height="100px" src="http://localhost:4000/'+marker.image+'" alt="http://localhost:4000/uploads/318x180.svg" />'+
            '<h4>' + marker.title + '</h4>'

        )
        .addTo(map);
     this.setState({
         file: "http://localhost:4000/"+marker.image,
         title: marker.title, //change mba3d ma tkamil olfa
         mode: "modify",
       numberOfBikesCapacity: marker.numberOfBikesCapacity,
       numberOfBikesAvailable: marker.numberOfBikesAvailable,
       etat: marker.etat,
       archived : marker.archived,
       id: marker._id,
         }
     );
     setTimeout(function() {
       myInstance.toggleModal();

     }, 1000);
   };
   addMarkers=(stations,map) =>{
     var myInstance = this;
     /* For each feature in the GeoJSON object above: */
     stations.forEach(function(marker) {
       if(!marker.archived){

      var el = document.createElement('div');
      el.id = "marker-" + marker.id;
      el.className = 'marker';
      new mapboxgl.Marker(el, { offset: [0, -23] })
          .setLngLat([marker.lng,marker.alt])
          .addTo(map);

      el.addEventListener('click', function(e){
        myInstance.flyToStore(marker,map);
        myInstance.createPopUp(marker,map,myInstance);
        /* Highlight listing in sidebar */
        var activeItem = document.getElementsByClassName('active');
        activeItem.forEach(function (active,i) {
          active.classList.remove('active');
        });
        var listing = document.getElementById('listing-' + marker.id);
        listing.classList.add('active');
      });
       }
    });

  };
   buildLocationList =(data,map)=> {
     var myInstance = this;
     var listings = document.getElementById('listings');
     listings.innerHTML="";
    data.forEach(function(station, i){
      if(!station.archived) {
        var listing = listings.appendChild(document.createElement('div'));
        listing.id = "listing-" + station.id;
        listing.className = 'item';
        var link = listing.appendChild(document.createElement('a'));
        link.href = '#';
        link.className = 'title';
        link.id = "link-" + station.id;
        link.innerHTML = station.title;

        link.addEventListener('click', function (e) {
          myInstance.flyToStore(station, map);
          var activeItem = document.getElementsByClassName('active');
          activeItem.forEach(function (active, i) {
            active.classList.remove('active');
          });
          if (this.parentElement.classList !== 'active')
            this.parentElement.classList.add('active');

        });

        var details = listing.appendChild(document.createElement('div'));
        details.innerHTML = station.etat;
        if (station.etat === "Maintenance") {
          details.innerHTML += ' · ' + "+21651868365";
        }
      }

    });

  };

  //MAP

  handlearchive = (archived, id) => {
    if (archived) this.props.unarchiveStation(id);
    else this.props.archiveStation(id);
    this.props.history.push("/stations/archived");
  };

  handlerCancel = e => {
    this.setState({
      title: "",
      imageData: null,
      selectedFile: null,
      loaded: false,
      numberOfBikesCapacity: 0,
      numberOfBikesAvailable: 0,
      etat: "Disponible",
      file: "http://localhost:4000/uploads/318x180.svg",
      archived:false,
    });
    this.toggleModal();
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0],
      loaded: true,
      file: URL.createObjectURL(event.target.files[0]),
    });
  };
  handleSubmit = event => {
    const newStation = new FormData();
    if (this.state.loaded) {
      newStation.append("imageData", this.state.selectedFile, this.state.selectedFile.name);
    }
    newStation.append("title", this.state.title);
    newStation.append("alt", this.state.alt);
    newStation.append("lng", this.state.lang);
    newStation.append("numberOfBikesCapacity", this.state.numberOfBikesCapacity);
    newStation.append("numberOfBikesAvailable", this.state.numberOfBikesAvailable);
    newStation.append("etat", this.state.etat);
    newStation.append("user", this.props.user.id._id);
    newStation.append("archived", this.state.archived);

    if (this.state.mode ==="modify"){
      this.props.editStation(newStation, this.state.id);
    }
    else{this.props.addStation(newStation);}
    this.toggleModal();
  };

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidUpdate(prevProps){
    if(prevProps.station != this.props.station){
      if (this.props.station.stations.length!==0)
      {
        var stations = this.props.station.stations;
      console.log(stations);
      stations.forEach(function(store, i){
        store.id = i;
      });
      this.buildLocationList(stations,map);
      this.addMarkers(stations,map);
      }
    }
  }
  componentDidMount() {
    const { lng, lat, zoom } = this.state;
    var myinstance =this;
     map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom
    });


    map.on('click', function(e) {
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['locations']
      });
      if (features.length) {
        var clickedPoint = features[0];

        myinstance.flyToStore(clickedPoint,map);
        myinstance.createPopUp(clickedPoint,map);
        var activeItem = document.getElementsByClassName('active');
        if (activeItem[0]) {
          activeItem[0].classList.remove('active');
        }
        var listing = document.getElementById('listing-' + clickedPoint.id);
        listing.classList.add('active');
      }
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();
      this.setState({lang:lng,alt:lat});
      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
  }
  render() {
    const { lng, lat, zoom } = this.state;
    let archive;
    if (this.state.mode==="modify"){
      archive = <Button
          className={'float-right'}
          color={!this.state.archived ? 'success' : 'danger'}
          onClick={() => this.handlearchive(this.state.archived, this.state.id)}
      >
        {!this.state.archived ? 'Archive' : 'Unarchive'}
      </Button>
    }

    return (
        <div className="animated fadeIn">
          <Row>
            <Col>
              <Card>
                <CardHeader style={{backgroundColor: "#00853e"}}>

                </CardHeader>
                <CardBody style={{backgroundColor: "#add8e6"}} >
                  <div className='wrapper1'>
                    <div  className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
                      <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
                    </div>
                    <div className="row">
                      <div className=' sidebar1'>
                        <div className='heading'>
                          <Button
                              type="submit"
                              className="m-2"
                              onClick={()=>{ this.setState({mode:"add"});this.handlerCancel();this.toggleModal()}}
                              style={{width:200}}
                              color="primary"
                          >
                            <i className="fa fa-dot-circle-o"/> Ajouter Station
                          </Button>
                        </div>
                        <div id='listings' className='listings'/>
                      </div>
                      <div  ref={this.mapRef} className="absolute top right  bottom map col-9" />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={this.state.modal} toggle={this.toggleModal} className="modal-lg" >
            <ModalHeader toggle={this.toggleModal}>{this.state.mode==="add"? "ajouter Station":"Modifier station"}</ModalHeader>
            <ModalBody >
              <Card >
                <CardImg top width="100%" src={this.state.file==null?"http://localhost:4000/uploads/318x180.svg":this.state.file} alt="http://localhost:4000/uploads/318x180.svg" />
                <CardBody>
                  <CardTitle>Card title</CardTitle>
                  <FormGroup row>
                    <Col md="8">
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
                      <FormText color="muted">
                        Titre de la station à ajouter
                      </FormText>
                    </Col>

                    <Col md="8">
                      <Label htmlFor="text-input">Location : </Label>
                    </Col>
                    <Col xs="6" md="9">
                      <Input
                          type="text"
                          name="alt"
                          value={this.state.alt}
                          onChange={this.handleInputChange}
                          placeholder="Altitude..."
                      />
                    </Col>
                    <Col xs="6" md="9">
                      <Input
                          type="text"
                          name="lang"
                          value={this.state.lang}
                          onChange={this.handleInputChange}
                          placeholder="Longitude..."
                      />
                    </Col>

                    <Col xs="6" md="9">
                      <Label htmlFor="text-input">Capacité :</Label>

                      <Input
                          name="numberOfBikesCapacity"
                          value={this.state.numberOfBikesCapacity}
                          onChange={this.handleInputChange}
                          type="number"
                          // placeholder="text..."
                      />
                    </Col>

                    <Col xs="6" md="9">
                      <Label htmlFor="text-input">Disponibilité :</Label>

                      <Input
                          name="numberOfBikesAvailable"
                          value={this.state.numberOfBikesAvailable}
                          onChange={this.handleInputChange}
                          type="number"
                          // placeholder="text..."
                      />
                    </Col>

                    <Col md="8">
                      <Label htmlFor="text-input">Etat :</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          type="select"
                          name="etat"
                          value={this.state.etat}
                          onChange={this.handleInputChange}
                      >
                        <option disabled>
                          Veuillez préciser l'état de la station
                        </option>
                        <option value="Disponible"> Disponible </option>
                        <option value="Maintenance"> Maintenance </option>
                        <option value="NonDispo"> Non Disponible </option>
                      </Input>
                    </Col>

                    <Col md="8">
                      <Label htmlFor="text-input">Image :</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Input
                          type="file"
                          name="type"
                          onChange={this.fileSelectedHandler}
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleSubmit}>Submit</Button>{' '}
              {archive}
              <Button color="secondary" onClick={this.handlerCancel}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>

    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.user,
  errors: state.errors,
  station: state.station,
  loading: state.station.loading,
  isModified: state.station.isModified
});
export default withRouter(
    connect(mapStateToProps, { addStation,getStations,    editStation,
      setIsModifiedStationLoading,archiveStation,unarchiveStation })(MapStation)
);
