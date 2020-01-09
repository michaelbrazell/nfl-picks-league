import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CacheBuster from './CacheBuster';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import StandingsPage from '../Standings';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import CssBaseline from '@material-ui/core/CssBaseline';

import './App.css'

const App = () => (
  <CacheBuster>
    {({ loading, isLatestVersion, refreshCacheAndReload }) => {
      if (loading) return null;
      if (!loading && !isLatestVersion) {
        refreshCacheAndReload();
      }

      return (
        <Router>
          <div>
            <CssBaseline />
            <Navigation />
            <div className="page">
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
              <Route path={ROUTES.SIGN_IN} component={SignInPage} />
              <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
              <Route path={ROUTES.HOME} component={HomePage} />
              <Route path={ROUTES.STANDINGS} component={StandingsPage} />
              <Route path={ROUTES.ACCOUNT} component={AccountPage} />
              <Route path={ROUTES.ADMIN} component={AdminPage} />
            </div>
          </div>
        </Router>
      );
    }}
  </CacheBuster>
  
)

export default withAuthentication(App);
