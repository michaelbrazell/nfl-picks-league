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
      <p className="centered">Welcome to the Playoff Picks League.  <Link to={ROUTES.HOME} className="body-link">Create an account</Link> to get started.</p>
      <Container maxWidth="md">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <Button component={Link} to={ROUTES.HOME} variant="contained" type="submit" color="primary" className="submit-button">Make your Picks</Button>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Button component={Link} to={ROUTES.STANDINGS} variant="outlined" type="submit" color="primary" className="submit-button">View Standings</Button>
          </Grid>
        </Grid>
      </Container>
    </Paper>
    <Paper className="paper-landing">
      <Grid container>
        <Grid item xs={12} sm={12} md={9}>
          <Typography component="h1" variant="h5">
            How it Works
          </Typography>
          <p>On the Picks Page, the weekend's games are available to pick from.  For each playoff game
            you'll make two picks:
          </p>
          <h3>Picking Against the Spread & The Over Under</h3>
          <ul className="how-it-works">
            <li><strong>Picking the winner of the game against the spread (ATS)</strong><br/>
              <em>Example:</em><br/>
              Houston Texans (+4.5) vs. New England Patriots (-4.5)<br/>
              If you select "New England Patriots (-4.5)" then you are betting that the New England Patriots will win and "cover the spread" of at least 4.5 points.<br/>
              If you select "Houston Texans (+4.5)" then you are betting that the Houston Texans will "cover the spread," meaning they will either win or lose but come within 4.5pts.<br/>
              For example, if the Patriots beat the Texans 24 - 17, then the Patriots would have "covered the spread."  If the Patriots win by fewer than 4.5 points, they have not covered and the bet is a loss.<br/>
              If the Patriots win 28 - 26, then Houston has "covered the spread," despite losing the game.
            </li>
            <li><strong>Picking the over/under on the total number of points</strong><br/>
              <em>Example:</em><br/>
              If the spread on the Texans vs. Patriots game is 44.5 points, and you bet the "over" then you're betting that both teams will combine for at least 44.5 points.<br/>
              For instance, if the score of the game is Patriots: 28, Texans: 24, that is a total of 52 points, which means the "over hits."  <br/>
              But if the score is Texans: 18, Patriots: 16, that is just a total of 34 points, which means the "under hits."
            </li>
          </ul>
          <p>Each correct choice will give you 1 win.  Each incorrect choice will give you 1 loss.</p>
          <h3>How Parlaying Works</h3>
          <p>Each game will also have an option to "Parlay" the two choices together.  If you choose to "Parlay" your winner (ATS) and your over/under selection, then both choices need to be
            correct.  If both choices are correct, you will be rewarded with one extra win for a total of 3 wins.  Howevever, if either choice is wrong, then you will receive 2 losses and 0 wins.
            There is no additional penalty for a failed parlay beyond 2 losses (e.g., you <em>do not</em> receive 3 losses for both incorrect choices + the parlay option being selected)
          </p>
          <h3>Changing Picks</h3>
          <p>At this time, picks cannot be changed once they are submitted.</p>
          <h3>Deadline for submitting picks</h3>
          <p>Please get all of your picks submitted by <strong>Saturday at 12:01pm</strong>.</p>
          <h3>Penalty for Not Submitting</h3>
          <p>For every choice that is not submitted by that Saturday, you'll receive a loss, e.g., 2 potential losses for every game.</p>
          <h3>How the Lines are Set</h3>
          <p>The lines will be set on the Tuesday of that week.  They're being sourced from various news sites like CBS SportsLine, but also adjusting for no pushes (a tie).</p>
          <p>The lines <strong>will not update once they are set</strong>.  Even if the official Vegas line moves during the week, these lines will stay persistent throughout the week.
            With this format there isn't a reward for trying to "lock in a pick" before it moves.  But it keeps the playing field even so that everybody in the pool picks against the same line.
          </p>
          <h3>Standings</h3>
          <p>The Standings will be updated once all games have been played for that week.  <br/>
          Note:  Standings may not be the official result.  This is the first year running this so the results will be verified manually.
          </p>
          <h3>Version</h3>
          <p>{global.appVersion}</p>
          
        </Grid>
      </Grid>

      
      
    </Paper>
  </Container>
);

export default Landing;