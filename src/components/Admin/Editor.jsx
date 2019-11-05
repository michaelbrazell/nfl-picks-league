import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './Editor.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "gameData":[
        {
          gameNumber:"",
          awayTeam:"",
          awayTeamSpread:"",
          homeTeam:"",
          homeTeamSpread:"",
          overUnder:""
        }
      ]
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, gameNumber) {
    // To Do - Create a gameID across all games, so not just a generic number but a unique ID
    //  eg., round-1-game-1, etc.
    var tempGameData = [...this.state.gameData]
    var tempGameNumber = gameNumber - 1
    tempGameData[tempGameNumber].awayTeam = event.target.value
    this.setState({
      "gameData": tempGameData
    })
  }

  componentDidMount() {
    this.setState({
      "gameData":this.props.data
    })
  }

  render() {
    return (
      <div className="admin-game-form">
        <h2>{this.props.roundName}</h2>
        <form>
          {
            this.state.gameData.map(game => {
              return (
                <Paper className="game" key={game.gameNumber}>
                  <h4>Game {game.gameNumber} - {game.awayTeam} at {game.homeTeam}</h4>
                  <div className="row-container">
                    <div>Team</div>
                    <div>Spread</div>
                    <div>Points</div>
                  </div>
                  <div className="row-container away-team-row">
                    <div>
                      <TextField
                        id="away-team-name"
                        label="Away Team Name"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={game.awayTeam}
                        onChange={ (e) => this.handleChange(e, game.gameNumber)}
                      />
                    </div>
                    <div>
                      <TextField
                        id="away-team-spread"
                        label="Spread"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={game.awayTeamSpread}
                      />
                    </div>
                    <div>
                      <TextField
                        id="away-team-points-scored"
                        label="Points"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                  <div className="row-container home-team-row">
                    <div>
                      <TextField
                        id="home-team-name"
                        label="Home Team Name"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={game.homeTeam}
                      />
                    </div>
                    <div>
                      <TextField
                        id="home-team-spread"
                        label="Spread"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        value={game.homeTeamSpread}
                      />
                    </div>
                    <div>
                      <TextField
                        id="home-team-points-scored"
                        label="Points"
                        margin="dense"
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                </Paper>      
              )
            })
          }
          
        </form>
      </div>
    )
  }
}


export default Editor;