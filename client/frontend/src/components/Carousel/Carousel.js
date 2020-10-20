import React, { useEffect } from 'react';
import Slider from 'react-slick';
import { Button, Container, Segment, Header } from 'semantic-ui-react';
import CarouselItem from './CarouselItem';
import { connect } from 'react-redux';
import { getSliders } from '../../actions/slidersActions';

function Carousel({ sliders, loading, getSliders }) {
  const slickSettings = {
    autoplay: true,
    dots: true,
    speed: 500,
  };

  useEffect(() => {
    getSliders();
  }, []);

  return (
    <>
      <Slider {...slickSettings} className="slide">
        {sliders.map((slider) => (
          <CarouselItem key={slider._id} slider={slider} />
        ))}
      </Slider>
    </>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  sliders: state.slider.sliders,
  loading: state.event.loading,
});

export default connect(mapStateToProps, { getSliders })(Carousel);
