import React from 'react';
import Game from '../PicksUI/Game'

const games = [
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

const Landing = () => (
  <div>
    <h1>NFL Pick'em League</h1>
    {
      games.map(game => {
        return (
          <Game awayTeam={game.awayTeam} awayTeamSpread={game.awayTeamSpread} homeTeam={game.homeTeam} homeTeamSpread={game.homeTeamSpread}/>
        )
      })
    }
  </div>
);

export default Landing;