import React from 'react'
import { Grid, Image, Segment, Header as SemanticHeader } from "semantic-ui-react";

function Info() {
    return (
        <>
          <Segment vertical>
            <Grid stackable>
              <Grid.Column width={10}>
                <SemanticHeader as="h1">
                  Come and share a bike !{" "}
                  <span className="sub">It'll blow your mind.</span>
                </SemanticHeader>
                <p>
                DOWNLOAD THE SHAREBIKE APP, CREATE YOUR ACCOUNT AND SIMPLY SCAN TO UNLOCK AND RIDE
                </p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Image src="/static/images/wireframe/square-image.jpg" />
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment vertical>
            <Grid stackable>
              <Grid.Column width={6}>
                <Image src="/static/images/wireframe/people.jpg" />
              </Grid.Column>
              <Grid.Column width={10}>
                <SemanticHeader as="h1">
                Convenient <span className="sub">& Simple.</span>
                </SemanticHeader>
                <p>
                  Donec ullamcorper nulla non metus auctor fringilla. Vestibulum
                  id ligula porta felis euismod semper. Praesent commodo cursus
                  magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus
                  ac cursus commodo.
                </p>
              </Grid.Column>
            </Grid>
          </Segment>

          <Segment vertical>
            <Grid stackable>
              <Grid.Column width={10}>
                <SemanticHeader as="h1">
                  And lastly, <span className="sub">Easy & Secure Payment.</span>
                </SemanticHeader>
                <p>
                Top-up your in-App wallet securely at anytime!

                </p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Image src="/static/images/wireframe/bike.jpg" />
              </Grid.Column>
            </Grid>
          </Segment>
            
        </>
    )
}

export default Info
