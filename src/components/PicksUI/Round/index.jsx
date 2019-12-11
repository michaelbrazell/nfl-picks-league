import React from 'react';
import Game from '../Game';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import './Round.css';

class Round extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roundData: this.props.data,
      userSelections: []
    }
  }

  // The function used to send everything to firebase
  onCreateChoices = (event) => {
    let choices = 'nothing for now'
    console.log(choices)
  }

  onHandleSelections = (updateType, gameId, selection) => {
    if (updateType === 'overUnder') {
      let overUnderSelections = {
        "game":gameId,
        "overUnderSelection":selection
      }

      let matchedGameId = this.state.userSelections.find(obj => obj.game === gameId);
  
      if (matchedGameId) {
        matchedGameId.overUnderSelection = selection;
        this.setState(prevState => {
          let userSelections = prevState.userSelections;
          if (userSelections.game === gameId) {
            userSelections.selection = selection
          }
          
          return { userSelections };
        })
      } else {
        this.setState({
          userSelections: [...this.state.userSelections, overUnderSelections]
        })  
      }
    } else if (updateType === 'team') {
      let teamSelection = {
        "game":gameId,
        "teamSelection":selection
      }

      let matchedGameId = this.state.userSelections.find(obj => obj.game === gameId);
  
      if (matchedGameId) {
        matchedGameId.teamSelection = selection;
        this.setState(prevState => {
          let userSelections = prevState.userSelections;
          if (userSelections.game === gameId) {
            userSelections.selection = selection
          }
          
          return { userSelections };
        })
      } else {
        this.setState({
          userSelections: [...this.state.userSelections, teamSelection]
        })  
      }
    
    } else if (updateType === 'parlay') {
      let parlaySelection = {
        "game":gameId,
        "parlay":selection
      }

      let matchedGameId = this.state.userSelections.find(obj => obj.game === gameId);
  
      if (matchedGameId) {
        matchedGameId.parlay = selection;
        this.setState(prevState => {
          let userSelections = prevState.userSelections;
          if (userSelections.game === gameId) {
            userSelections.selection = selection
          }
          
          return { userSelections };
        })
      } else {
        this.setState({
          userSelections: [...this.state.userSelections, parlaySelection]
        })  
      }
      
    }

  }

  renderSelectionParlay(selection) {
    console.log(selection)
    if (!selection || selection === false) {
      return (
        <li>Parlay: No</li>
      )
    } else if (selection === true) {
      return (
        <li><strong>Parlay: Yes</strong></li>
      )
    }
  }
  
  render() {
    return (
      <React.Fragment>
        {console.log('User Selections State:', this.state.userSelections)}
        {
          this.state.roundData.map(round => {
            if (round.selected === true) {
              return (
                <Container component="main" maxWidth="lg">

                  <div className="round-choices" key={round.roundNumber}>
                    <Typography component="h1" variant="h4">
                      {round.name} Round
                    </Typography>
                    <form onSubmit={event => this.onCreateSelections(event) }>
                      <Grid container spacing={3}>
                      {
                        round.gameData.map(game => {
                          return(
                            <Grid item xs={12} sm={12} md={6}>
                              <Game 
                                gameId={'round-'+round.roundNumber+'-game-'+game.gameNumber} 
                                key={'round-'+round.roundNumber+'-game-'+game.gameNumber}
                                awayTeam={game.awayTeam} 
                                awayTeamSpread={game.awayTeamSpread} 
                                homeTeam={game.homeTeam} 
                                homeTeamSpread={game.homeTeamSpread}
                                overUnder={game.overUnder}
                                onSelectionChange={this.onHandleSelections.bind(this)}
                              />
                            </Grid>
                          )
                        })
                      }
                      </Grid>
                      {this.state.userSelections.length > 0 &&
                        <Container component="main" maxWidth="sm">
                          <Paper className="round-selections paper-selections">
                            <Typography component="h1" variant="h5">
                              Your Selections
                            </Typography>
                            {
                              this.state.userSelections.map( (game, i) => {
                                return (
                                  <div key={game.gameNumber}>
                                    <p><strong>Game {i+1}</strong></p>
                                    <ul>
                                      <li>Winner: {game.teamSelection}</li>
                                      <li>Over/Under: {game.overUnderSelection}</li>
                                      {this.renderSelectionParlay(game.parlay)}
                                    </ul>
                                    <Divider />
                                  </div>
                                )
                              })
                            }
                            <Button variant="contained" type="submit" color="primary" className="submit-button">Submit {round.name} Selections</Button>
                          </Paper>
                        </Container>
                      
                      }
                    </form>
                  </div>
                </Container>
              )

            }
          })
        }

      </React.Fragment>
    )
  }
}


export default Round;