import React from 'react';
import {Grid, Image, Header, Container, Segment, Button} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
function EventItem({ event }) {
  return (

      <Segment style={{backgroundImage: "url(http://localhost:4000/"+event.image.replace(/(["\\])/g,"\\$1").replace(/\n/g,"\\n")+")"}} inverted vertical textAlign="center">
          <Container  text className="active">
              <Header inverted as="h1">
                  {event.title}
              </Header>
              <p>{event.description.substr(0, 99)}{' '}
                  {event.description.length &&  event.description.length > 100 && '...'}</p>
              <br/>

              <Link to={`/event/${event._id}`}>View details &raquo;</Link>
          </Container>
      </Segment>
  );
}

export default EventItem;
