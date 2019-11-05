import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Editor from './Editor.jsx'

const playoffData = {
  "round":[{
    "name":"Wildcard",
    "roundNumber":1,
    "active":true,
    "gameData":[
      {
        gameNumber:1,
        awayTeam:"Tennessee Titans",
        awayTeamSpread:"+8",
        homeTeam:"Kansas City Chiefs",
        homeTeamSpread:"-8",
        overUnder:"44.5"
      },
      {
        gameNumber:2,
        awayTeam:"Atlanta Falcons",
        awayTeamSpread:"+6",
        homeTeam:"Los Angeles Rams",
        homeTeamSpread:"-6",
        overUnder:"48.5"
      },
      {
        gameNumber:3,
        awayTeam:"Buffalo Bills",
        awayTeamSpread:"+8.5",
        homeTeam:"Jacksonville Jaguars",
        homeTeamSpread:"-8.5",
        overUnder:"39.5"
      },
      {
        gameNumber:4,
        awayTeam:"Carolina Panthers",
        awayTeamSpread:"+6.5",
        homeTeam:"New Orleans Saints",
        homeTeamSpread:"-6.5",
        overUnder:"48.5"
      }
    ]
  },
  {
    "name":"Divisional",
    "roundNumber":2,
    "active":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      },
      {
        "gameNumber":2,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      },
      {
        "gameNumber":3,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      },
      {
        "gameNumber":4,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      }
    ]
  },
  {
    "name":"Championship",
    "roundNumber":3,
    "active":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      },
      {
        "gameNumber":2,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      }
    ]
  },
  {
    "name":"Superbowl",
    "roundNumber":4,
    "active":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":""
      },
    ]
  }]
}

class AdminPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      round: '',
      roundData: playoffData.round[0]
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    playoffData.round.forEach(round => {
      if (round.name === event.target.value) {
        this.setState({
          roundData: round,
          round: round.name
        })
      }
    })
  }

  componentDidMount() {
    this.setState({
      round: playoffData.round[0].name,
    })
  }

  render() {
    return (
      <div>
        <h1>Admin</h1>
        <FormControl autoComplete="off">
          <InputLabel htmlFor="round">Round</InputLabel>
          <Select
            value={this.state.round}
            onChange={this.handleChange}
            className="round-select"
            inputProps={{
              name: 'round',
              id: 'round-simple',
            }}
          >
            {
              playoffData.round.map(round => {
                return (
                  <MenuItem key={round.roundNumber} value={round.name}>{round.name}</MenuItem>      
                )
              })
            }
          </Select>
        </FormControl>
        <Editor 
          roundName={this.state.roundData.name}
          data={this.state.roundData.gameData}/>
        <Switch>
          <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
          <Route exact path={ROUTES.ADMIN} component={UserList} />
        </Switch>
      </div>
    )

  }
}

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong> {user.uid}
              </span>
              <span>
                <strong>E-Mail:</strong> {user.email}
              </span>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const UserItem = ({ match }) => (
  <div>
    <h2>User ({match.params.id})</h2>
  </div>
);

const condition = authUser =>
  authUser && authUser.roles.includes(ROLES.ADMIN);

const UserList = withFirebase(UserListBase);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);