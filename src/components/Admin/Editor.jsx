import React from 'react';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import './Editor.css'

class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      gameData:[
        {
          gameId:"",
          gameNumber:"",
          awayTeam:"",
          awayTeamSpread:"",
          homeTeam:"",
          homeTeamSpread:"",
          overUnder:""
        }
      ],
      roundNumber: ""
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, gameId, itemToUpdate) {
    var tempGameData = [...this.state.gameData]
    
    if (itemToUpdate === 'awayTeam') {
      // turn this into a repeatable function
      tempGameData.forEach(game => {
        if (game.game1Id === gameId) {
          game.awayTeam = event.target.value
        }
      })
    } else if (itemToUpdate === 'homeTeam') {
      // turn this into a repeatable function
      tempGameData.forEach(game => {
        if (game.gameId === gameId) {
          game.homeTeam = event.target.value
        }
      })
    }

    
    this.setState({
      "gameData": tempGameData
    })
  }

  componentDidMount() {
    this.setState({
      gameData:this.props.data,
      roundNumber:this.props.roundNumber
    })
  }

  render() {
    console.log(this.state.gameData)
    return (
      <div className="admin-game-form">
        <h2>{this.props.roundName}</h2>
        <form>
          {
            this.state.gameData.map(game => {
              return (
                <Paper className={'game ' + game.gameId} key={'key-' + game.gameId}>
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
                        onChange={ (e) => this.handleChange(e, game.gameId, 'awayTeam')}
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
                        onChange={ (e) => this.handleChange(e, game.gameId, 'homeTeam')}
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