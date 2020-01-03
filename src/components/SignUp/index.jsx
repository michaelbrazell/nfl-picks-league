import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;

    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      // isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <Container component="main" maxWidth="sm">
        <Paper className="paper-sign-in">
          
          <CssBaseline />
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={this.onSubmit}>
            <TextField
              onChange={this.onChange}
              value={username}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              placeholder="Username"
              autoComplete="username"
              helperText="Your username will be displayed publicly to identify your results."
              autoFocus
            />
            
            <TextField
              onChange={this.onChange}
              value={email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              helperText="Your email address will be used for login and account management."
            />
            <TextField
              value={passwordOne}
              onChange={this.onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordOne"
              label="Password"
              type="password"
              id="passwordOne"
              placeholder="Password"
              autoComplete="current-password"
            />
            <TextField
              value={passwordTwo}
              onChange={this.onChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordTwo"
              label="Confirm Password"
              type="password"
              id="passwordOne"
              placeholder="Confirm Password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox name="isAdmin" checked={isAdmin} 
              onChange={this.onChangeCheckbox} value="is-admin" color="primary" />}
              label="Is Admin"
            /> */}
            <p>
              <small>Your data will not be used in any way other than for required functionality in this picks league.
                Your email address will not be visible to anybody.  Your username will be used to identify your league results.
              </small>
            </p>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={isInvalid}
            >
              Sign Up
            </Button>
            {error && <p>{error.message}</p>}

          </form>
        </Paper>
      </Container>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP} className="body-link">Sign Up</Link>
  </p>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };