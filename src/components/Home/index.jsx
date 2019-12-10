import React from 'react';
import Round from '../PicksUI/Round'
import RoundNavigation from '../PicksUI/RoundNavigation'

import { withAuthorization } from '../Session';

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
    "roundNumber":3,
    "name":"Championship",
    "active":false,
    "selected":false,
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
        "awayTeam":"Tennessee Titans",
        "awayTeamSpread":"+8",
        "homeTeam":"Kansas City Chiefs",
        "homeTeamSpread":"-8",
        "overUnder":"44.5"
      }
    ]
  }
]

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roundData: roundData
    }
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
        <Round data={roundData} />
      </div>
    )
  }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);