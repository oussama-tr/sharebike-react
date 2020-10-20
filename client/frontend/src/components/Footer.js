import React from 'react';
import { Grid, Segment, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
      <Segment vertical>
        <Grid columns={2}>
          <Grid.Column>
            &copy; 2017 Company, Inc. · <Link to="#root">Privacy</Link> ·{' '}
            <Link to="#root">Terms</Link>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Link to="#root">Back to top</Link>
          </Grid.Column>
        </Grid>
      </Segment>
  );
}

export default Footer;
