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
        "awayTeam":"Kansas City Chiefs",
        "awamTeamSpread":"-3",
        "homeTeam":"Denver Broncos",
        "homeTeamSpread":"+3",
        "gameDetails":"Thursday - 8:20pm"
      },
      {
        "gameNumber":2,
        "awayTeam":"Los Angeles Rams",
        "awamTeamSpread":"-3",
        "homeTeam":"Atlanta Falcons",
        "homeTeamSpread":"+3",
        "gameDetails":"Sunday - 1:00pm"
      },
      {
        "gameNumber":3,
        "awayTeam":"Miami Dolphins",
        "awamTeamSpread":"+17",
        "homeTeam":"Buffalo Bills",
        "homeTeamSpread":"-17",
        "gameDetails":"Sunday - 1:00pm"
      },
      {
        "gameNumber":4,
        "awayTeam":"Jacksonville Jaguars",
        "awamTeamSpread":"-3.5",
        "homeTeam":"Cincinatti Bengals",
        "homeTeamSpread":"+3.5",
        "gameDetails":"Sunday - 1:00pm"
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