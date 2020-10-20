import React, { Component  } from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
} from 'reactstrap';
import './BikesMap.css'
import mapboxgl from 'mapbox-gl'
import { getStations} from "./actions/stationActions";
import { connect } from "react-redux";
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import Directions from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
mapboxgl.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA';

var map;
var directions = new Directions({
  accessToken: "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA",
  unit: 'metric',
  profile: 'mapbox/cycling'
});

class Mapbox extends Component {
  mapRef = React.createRef();

  constructor(props: Props) {
    super(props);
    this.props.getStations();
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 5,
    };
  }
  _locateUser =()=> {
    // https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({lng:position.coords.longitude,lat:position.coords.latitude,zoom:5});
      directions.setOrigin([position.coords.longitude,position.coords.latitude]);
      console.log(position);
    },
        function error(msg) {alert('Please enable your GPS position feature.');},
        {maximumAge:10000, timeout:5000, enableHighAccuracy: true});
  };
  //map
  flyToStore=(station,map)=> {
    map.flyTo({
      center: [station.lng,station.alt],
      zoom: 15
    });
    directions.setDestination([station.lng,station.alt]);
    console.log("yo");

  };
  createPopUp =(marker,map,myInstance)=> {
    var popUps = document.getElementsByClassName('mapboxgl-popup');
    if (popUps[0]) popUps[0].remove();
    var image;

    var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([marker.lng,marker.alt])
        .setHTML('<h3>Sweetgreen</h3>' +
            '<image center  width="100%" height="100px" src="http://localhost:4000/'+marker.image+'" alt="Card image cap" />'+
            '<h4>' + marker.title + '</h4>'

        )
        .addTo(map);

  };
  addMarkers=(stations,map) =>{
    var myInstance = this;
    stations.forEach(function(marker) {
      if(!marker.archived) {
        var el = document.createElement('div');
        el.id = "marker-" + marker.id;
        el.className = 'marker';

        new mapboxgl.Marker(el, {offset: [0, -23]})
            .setLngLat([marker.lng, marker.alt])
            .addTo(map);
        el.addEventListener('click', function (e) {
          myInstance.flyToStore(marker, map);
          myInstance.createPopUp(marker, map, myInstance);
          var activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
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
          e.stopPropagation();
          if (activeItem[0]) {
            activeItem[0].classList.remove('active');
          }
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



  componentDidUpdate(prevProps){
    if(prevProps.station != this.props.station){
      if (this.props.station.stations.length!=0)
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
    map.on('load', () => {
      map.addControl(directions, 'top-left');
      this._locateUser();
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


    return (
        <div >

          <div className='sidebar'>
            <div className='heading'>
              <h1>Our locations</h1>
            </div>
            <div id='listings' className='listings'></div>
          </div>
          <div ref={this.mapRef} className='map'></div>

        </div>

    );
  }

}

const mapStateToProps = (state) => ({
  errors: state.errors,
  station: state.station,
  loading: state.station.loading,
});

export default connect(mapStateToProps, { getStations })(Mapbox);
