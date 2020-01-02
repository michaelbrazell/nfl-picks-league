import React from 'react';

import { AuthUserContext, withAuthorization } from '../Session';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import SignOutButton from '../SignOut';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import './Account.css'

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      <Container component="main" maxWidth="sm">
        {console.log(authUser)}
        <Paper className="paper-sign-in">
          <Typography component="h1" variant="h5">
            Hi {authUser.username}!
          </Typography>
          <PasswordForgetForm />
          <Divider className="account-divider" />
          <PasswordChangeForm />
          <Divider className="account-divider" />
          <SignOutButton />
        </Paper>
      </Container>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);