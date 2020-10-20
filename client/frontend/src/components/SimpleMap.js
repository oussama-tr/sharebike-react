import React, { useState, useRef, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { Dropdown } from 'semantic-ui-react';
import { getStations } from '../actions/stationActions';
import { connect } from 'react-redux';
import useSupercluster from "use-supercluster";

// clustering
import useSwr from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

const AnyReactComponent = ({ text }) => (
  <div style={{ color: 'red' }}>{text}</div>
);

function SimpleMap({ loading, stations, getStations }) {
  useEffect(() => {
    getStations();
  }, []);

  // static defaultProps = {
  //   center: {
  //     lat: 59.95,
  //     lng: 30.33,
  //   },
  //   zoom: 11,
  // };
<<<<<<< HEAD
// console.log(stations);
=======
>>>>>>> df31b1ef513517da6f0ce44e30457b98101d6334

  const mapRef = useRef();
  // get map bounds
  const [bounds, setBounds] = useState(null);
  const [zoom, setZoom] = useState(10);
  const [counties, setCountries] = useState([{ title: '' }]);

  // const url =
  //   "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10";
  // const { data, error } = useSwr(url, { fetcher });
  // const crimes = data && !error ? data.slice(0, 2000) : [];
  // console.log(crimes);
  const points = stations.map((station) => ({
    type: 'Feature',
    properties: {
      cluster: false,
      stationId: station._id,
      category: station.title,
    },
    geometry: {
      type: 'Point',
      coordinates: [parseFloat(station.lng), parseFloat(station.alt)],
    },
  }));

  console.log(points);

  // get clusters

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });
<<<<<<< HEAD


=======
>>>>>>> df31b1ef513517da6f0ce44e30457b98101d6334

  return (
    // Important! Always set the container height explicitly
    <>
      <Dropdown
<<<<<<< HEAD
        placeholder='Select Country'
=======
        placeholder="Select Country"
>>>>>>> df31b1ef513517da6f0ce44e30457b98101d6334
        fluid
        search
        selection
        options={stations.map((station) => ({
          text: station.title,
          value: station.title,
          key: station.createdAt,
        }))}
      />
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyB8pEpEf6ngc1TbpGw6MVJ2zM-h-XY_EWU' }}
          defaultCenter={{ lat: 59.955413, lng: 30.337844 }}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          <AnyReactComponent lat={59.95541} lng={30.33784} text="My Marker" />

          {stations.map((station) => (
            <AnyReactComponent
              lat={station.alt}
              lng={station.lng}
              text={station.title}
              key={station.createdAt}
            />
          ))}
        </GoogleMapReact>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  // console.log(state);
  // return {
  errors: state.errors,
  stations: state.station.stations,
  loading: state.station.loading,
  //}
});

export default connect(mapStateToProps, { getStations })(SimpleMap);
