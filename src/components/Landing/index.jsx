import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './Landing.css'

const Landing = () => (
  <Container component="main" maxWidth="lg">
    <Paper className="paper-landing">
      <Typography component="h1" variant="h4" className="centered">
        Playoff Picks League
      </Typography>
      <p className="centered">Welcome to the Playoff Picks League.  Get started below.</p>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Button component={Link} to={ROUTES.HOME} variant="contained" type="submit" color="primary" className="submit-button">Make your Picks</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Button component={Link} to={ROUTES.STANDINGS} variant="contained" type="submit" color="primary" className="submit-button">View Standings</Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
    <Paper className="paper-landing">
      <Typography component="h1" variant="h5">
        How it Works
      </Typography>
      <p>TBD</p>
    </Paper>
  </Container>
);

export default Landing;