import React from 'react';
import { compose } from 'recompose';
import { withAuthorization, AuthUserContext } from '../Session';

import { withFirebase } from '../Firebase';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import Round from '../PicksUI/Round'
import RoundNavigation from '../PicksUI/RoundNavigation'

import './Home.css';

const roundData = [
  {
    "roundNumber":1,
    "name":"Wildcard",
    "active":true,
    "selected":true,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"Buffalo Bills",
        "awayTeamSpread":"+2.5",
        "homeTeam":"Houston Texans",
        "homeTeamSpread":"-2.5",
        "overUnder":"43.5",
        "gameDetails":"Saturday, Jan. 4, 4:35pm"
      },
      {
        "gameNumber":2,
        "awayTeam":"Tennessee Titans",
        "awayTeamSpread":"+4.5",
        "homeTeam":"New England Patriots",
        "homeTeamSpread":"-4.5",
        "overUnder":"44.5",
        "gameDetails":"Saturday, Jan. 4, 8:15pm"
      },
      {
        "gameNumber":3,
        "awayTeam":"Minnesota Vikings",
        "awayTeamSpread":"+7.5",
        "homeTeam":"New Orleans Saints",
        "homeTeamSpread":"-7.5",
        "overUnder":"49.5",
        "gameDetails":"Sunday, Jan. 5, 1:05pm"
      },
      {
        "gameNumber":4,
        "awayTeam":"Seattle Seahawks",
        "awayTeamSpread":"-1.5",
        "homeTeam":"Philadelphia Eagles",
        "homeTeamSpread":"+1.5",
        "overUnder":"45.5",
        "gameDetails":"Sunday, Jan. 5, 4:40pm"
      }
    ]
  },
  {
    "roundNumber":2,
    "name":"Divisional",
    "active":false,
    "selected":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      },
      {
        "gameNumber":2,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      },
      {
        "gameNumber":3,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      },
      {
        "gameNumber":4,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      }
    ]
  },
  {
    "roundNumber":3,
    "name":"Championship",
    "active":false,
    "selected":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      },
      {
        "gameNumber":2,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      }
    ]
  },
  {
    "roundNumber":4,
    "name":"Superbowl",
    "active":false,
    "selected":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"",
        "awayTeamSpread":"",
        "homeTeam":"",
        "homeTeamSpread":"",
        "overUnder":"",
        "gameDetails":""
      }
    ]
  }
]

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: null,
      roundData: []
    }
  }
  
  componentDidMount() {
    this.setState({
      roundData: roundData
    })

    this.props.firebase.users().on('value', snapshot => {
      this.setState({
        users: snapshot.val(),
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  setSelectedRound(roundNumber) {
    var tempRoundData = this.state.roundData
    
    tempRoundData.forEach(round => {
      if (round.roundNumber === roundNumber) {
        round.selected = true
      } else {
        round.selected = false
      }
    })
        
    this.setState({
      roundData: tempRoundData
    })
  }

  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <Container component="main" maxWidth="lg">
            <Grid container spacing={3}>
              {
                this.state.roundData.map(round => {
                  return (
                    <RoundNavigation key={round.roundNumber} name={round.name} selected={round.selected} 
                    handleRoundChoice={(e) => this.setSelectedRound(round.roundNumber)} />
                  )
                })
              }
            </Grid>
            {
              this.state.roundData.map(round => {
                if (round.selected === true) {
                  return (
                    <Round 
                      data={round} 
                      users={this.state.users} 
                      authUser={authUser}
                      key={round.roundNumber} 
                      active={round.active} />
                  )
                } else {
                  return ''
                }
              })
            }
          </Container>
        )}  
      </AuthUserContext.Consumer>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);