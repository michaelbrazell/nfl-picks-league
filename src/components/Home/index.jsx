import React from 'react';
import { compose } from 'recompose';

import Round from '../PicksUI/Round'
import RoundNavigation from '../PicksUI/RoundNavigation'

import { withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

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
        "awayTeam":"Tennessee Titans",
        "awayTeamSpread":"+8",
        "homeTeam":"Kansas City Chiefs",
        "homeTeamSpread":"-8",
        "overUnder":"44.5"
      },
      {
        "gameNumber":2,
        "awayTeam":"Atlanta Falcons",
        "awayTeamSpread":"+6",
        "homeTeam":"Los Angeles Rams",
        "homeTeamSpread":"-6",
        "overUnder":"48.5"
      },
      {
        "gameNumber":3,
        "awayTeam":"Buffalo Bills",
        "awayTeamSpread":"+8.5",
        "homeTeam":"Jacksonville Jaguars",
        "homeTeamSpread":"-8.5",
        "overUnder":"39.5"
      },
      {
        "gameNumber":4,
        "awayTeam":"Carolina Panthers",
        "awayTeamSpread":"+6.5",
        "homeTeam":"New Orleans Saints",
        "homeTeamSpread":"-6.5",
        "overUnder":"48.5"
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
        "overUnder":""
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
    console.log('Clicke!', roundNumber)
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
      <div>
        <div className="round-navigation">
          {
            this.state.roundData.map(round => {
              return (
                <RoundNavigation key={round.roundNumber} name={round.name} selected={round.selected} 
                handleRoundChoice={(e) => this.setSelectedRound(round.roundNumber)}/  
                >
              )
            })
          }
        </div>
        <Round data={roundData} users={this.state.users} />
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);