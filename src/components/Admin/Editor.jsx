import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './Editor.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'foo':'foo'
    }
  }

  render() {
    return (
      <div className="admin-game-form">
        <h2>{this.props.roundName}</h2>
        <form>
          {
            this.props.data.map(game => {
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
          <Paper className="game">
            <h3>Game 1</h3>
          </Paper>
          
        </form>
      </div>
    )
  }
}


export default Editor;