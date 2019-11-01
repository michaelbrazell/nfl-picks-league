import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
// import * as ROLES from '../../constants/roles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import './Navigation.css';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
          <NavigationNonAuth />
        )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
  <div className="header-navigation signed-in">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="title">
          <Link to={ROUTES.HOME}>Playoff Pick'em League</Link>
        </Typography>
        <Link to={ROUTES.ACCOUNT}>
          <MenuItem>
            <IconButton
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {authUser.username}
          </MenuItem>
        </Link>
      </Toolbar>
    </AppBar>
    <div className="sub-navigation">
      <ul>
        <li><Link to={ROUTES.HOME}>Picks</Link></li>
        <li><Link to={ROUTES.RESULTS}>Results</Link></li>
        <li><Link to={ROUTES.STANDINGS}>Standings</Link></li>
      </ul>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className="header-navigation signed-out">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className="title">
          <Link to={ROUTES.LANDING}>Playoff Pick'em League</Link>
        </Typography>
        <Link to={ROUTES.SIGN_IN}>
          <MenuItem>
            Sign In
          </MenuItem>
        </Link>
      </Toolbar>
    </AppBar>
  </div>
);

export default Navigation;