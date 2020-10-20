import React, { useEffect } from 'react';
import { getEvent } from '../actions/eventActions';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Header, Image, Label } from 'semantic-ui-react';
import moment from 'moment';

function Event({ event, getEvent }) {
  const { id } = useParams();
  useEffect(() => {
    getEvent(id);
  }, [id]);

  return (
    <div>
      <Container text style={{ marginTop: '7em' }}>
        <Header as="h1">{event.title}</Header>
        <Image
          src={`http://localhost:4000/${event.image}`}
          style={{ marginTop: '2em' }}
        />

        <Label style={{ marginTop: '4em' }} as="a" color="teal" tag>
          {event.type}
        </Label>
        <p style={{ marginTop: '1em', color: 'grey' }}>
          From <b>{moment(event.dateStart).format('YYYY-MM-DD')}</b> To{' '}
          <b>{moment(event.dateEnd).format('YYYY-MM-DD')}</b>{' '}
        </p>
        <p style={{ marginTop: '1em' }}>{event.description}</p>
      </Container>
    </div>
  );
}

const mapStateToProps = (state) => ({
  errors: state.errors,
  event: state.event.event,
});

export default connect(mapStateToProps, { getEvent })(Event);
