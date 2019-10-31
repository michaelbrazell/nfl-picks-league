import React from 'react';
import Round from '../PicksUI/Round'

import { withAuthorization } from '../Session';

import './Home.css';

const roundData = [
  {
    "roundNumber":1,
    "name":"Wildcard",
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
  }
]

const HomePage = () => (
  <div>
    <div className="round-navigation">
      {
        roundData.map(round => {
          return (
            <div className="round" key={round.roundNumber}>
              {round.name}
            </div>
          )
        })
      }
    </div>
    <Round data={roundData} />
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);