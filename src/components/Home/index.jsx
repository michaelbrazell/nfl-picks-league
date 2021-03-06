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
    "selected":false,
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
    "active":true,
    "selected":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"Minnesota Vikings",
        "awayTeamSpread":"+6.5",
        "homeTeam":"San Francisco 49ers",
        "homeTeamSpread":"-6.5",
        "overUnder":"44.5",
        "gameDetails":"Saturday, Jan. 11, 4:35pm"
      },
      {
        "gameNumber":2,
        "awayTeam":"Tennessee Titans",
        "awayTeamSpread":"+9.5",
        "homeTeam":"Baltimore Ravens",
        "homeTeamSpread":"-9.5",
        "overUnder":"46.5",
        "gameDetails":"Saturday, Jan. 11, 4:35pm"
      },
      {
        "gameNumber":3,
        "awayTeam":"Houston Texans",
        "awayTeamSpread":"+9.5",
        "homeTeam":"Kansas City Chiefs",
        "homeTeamSpread":"-9.5",
        "overUnder":"51.5",
        "gameDetails":"Sunday, Jan. 12, 3:05pm"
      },
      {
        "gameNumber":4,
        "awayTeam":"Seattle Seahawks",
        "awayTeamSpread":"+3.5",
        "homeTeam":"Green Bay Packers",
        "homeTeamSpread":"-3.5",
        "overUnder":"47.5",
        "gameDetails":"Sunday, Jan. 12, 6:40pm"
      }
    ]
  },
  {
    "roundNumber":3,
    "name":"Championship",
    "active":true,
    "selected":true,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"Tennessee Titans",
        "awayTeamSpread":"+7.5",
        "homeTeam":"Kansas City Chiefs",
        "homeTeamSpread":"-7.5",
        "overUnder":"52.5",
        "gameDetails":"Sunday, Jan. 19, 3:05 p.m."
      },
      {
        "gameNumber":2,
        "awayTeam":"Green Bay Packers",
        "awayTeamSpread":"+7.5",
        "homeTeam":"San Francisco 49ers",
        "homeTeamSpread":"-7.5",
        "overUnder":"44.5",
        "gameDetails":"Sunday, Jan. 19, 6:40 p.m."
      }
    ]
  },
  {
    "roundNumber":4,
    "name":"Superbowl",
    "active":true,
    "selected":false,
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"San Francisco 49ers",
        "awayTeamSpread":"+1.5",
        "homeTeam":"Kansas City Chiefs",
        "homeTeamSpread":"-1.5",
        "overUnder":"54.5",
        "gameDetails":"Sunday, Feb. 02, 6:30 p.m."
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