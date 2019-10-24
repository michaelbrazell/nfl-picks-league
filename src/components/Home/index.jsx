import React from 'react';
import Game from '../PicksUI/Game'

import { withAuthorization } from '../Session';

import './Home.css';

const rounds = [
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
  },
  {
    "roundNumber":2,
    "name":"Divisional",
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
  },
  {
    "roundNumber":3,
    "name":"Championship",
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
      }
    ]
  },
  {
    "roundNumber":4,
    "name":"Super Bowl",
    "gameData":[
      {
        "gameNumber":1,
        "awayTeam":"Kansas City Chiefs",
        "awamTeamSpread":"-3",
        "homeTeam":"Denver Broncos",
        "homeTeamSpread":"+3",
        "gameDetails":"Thursday - 8:20pm"
      }
    ]
  }
]

const HomePage = () => (
  <div>
    <div className="round-navigation">
      {
        rounds.map(round => {
          return (
            <div className="round" key={round.roundNumber}>
              {round.name}
            </div>
          )
        })
      }
    </div>
    {
      rounds.map(round => {
        return (
          <div className="foo" key={round.roundNumber}>
            <h3>{round.name} Round</h3>
            <div className="games-grid">
              {
                round.gameData.map(game => {
                  return(
                    <Game awayTeam={game.awayTeam} awayTeamSpread={game.awayTeamSpread} homeTeam={game.homeTeam} homeTeamSpread={game.homeTeamSpread}/>
                  )
                })
              }
            </div>
            <button>Submit {round.name} Round</button>
          </div>
        )
      })
    }
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);