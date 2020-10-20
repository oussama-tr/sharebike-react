import React from 'react';
import { Button, Container, Header, Segment } from 'semantic-ui-react';

function CarouselItem({ slider }) {
  return (
    <Segment style={{backgroundImage: "url(http://localhost:4000/"+slider.image.replace(/(["\\])/g,"\\$1").replace(/\n/g,"\\n")+")"}} inverted vertical textAlign="center">
      <Container  text className="active">
        <Header inverted as="h1">
          {slider.title}
        </Header>
        <p>{slider.description}</p>


      </Container>
    </Segment>
  );
}

export default CarouselItem;
