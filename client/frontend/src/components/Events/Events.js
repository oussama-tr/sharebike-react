import React, { useEffect } from 'react';
import { Grid, Segment, Loader } from 'semantic-ui-react';
import { getLatestEvents } from '../../actions/eventActions';
import EventItem from './EventItem';
import { connect } from 'react-redux';
import Slider from "react-slick/lib";

function Events({ loading, events, getLatestEvents }) {
  const slickSettings = {
    autoplay: true,
    dots: true,
    speed: 500,
  };

  useEffect(() => {
    getLatestEvents();
  }, []);
  return (
      <>
        <Slider {...slickSettings} className="slide">
          {loading ? (
              <Loader active />
          ) : (
              events.map((event) => <EventItem key={event._id} event={event} />)
          )}
        </Slider>
      </>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  events: state.event.events,
  loading: state.event.loading,
});

export default connect(mapStateToProps, { getLatestEvents })(Events);
