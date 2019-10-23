import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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
  <div className="header-navigation signed-out">
    <div className="primary-navigation">
      <div className="header-left">
        <Link to={ROUTES.LANDING}>Playoff Pick'em League</Link>
      </div>
      <div className="header-right">
        <Link to={ROUTES.ACCOUNT}>{authUser.username}</Link>
      </div>
    </div>
    <div className="secondary-navigation">
      <ul>
        <li><Link to={ROUTES.HOME}>Make Your Picks</Link></li>
        <li><a href="#">Standings</a></li>
        {authUser.roles.includes(ROLES.ADMIN) && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
      </ul>
    </div>
  </div>
);

const NavigationNonAuth = () => (
  <div className="header-navigation signed-out">
    <div className="primary-navigation">
      <div className="header-left">
        <Link to={ROUTES.LANDING}>Playoff Pick'em League</Link>
      </div>
      <div className="header-right">
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </div>
    </div>
  </div>
);

export default Navigation;