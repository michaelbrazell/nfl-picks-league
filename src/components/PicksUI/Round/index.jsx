import React from 'react';
import Game from '../Game';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withFirebase } from '../../Firebase';

import './Round.css';

class Round extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      roundData: this.props.data,
      userSelections: [],
      submittedEntries: [],
      userSubmittedEntry: [],
      userSubmittedPreviously: false,
      roundSubmitted: false
    }
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

  componentDidMount() {
    this.props.firebase.entries().on('value', snapshot => {
      const entryObject = snapshot.val();

      // Make sure entries isn't empty
      if (entryObject !== null) {
        const entryList = Object.keys(entryObject).map(key => ({
          ...entryObject[key],
          uid: key,
        }));
  
        let usersEntry = entryList.filter((entry) => {
          return entry.userId === this.props.authUser.uid
        })

        if (usersEntry[0].roundsComplete.length > 0) {
          usersEntry[0].roundsComplete.forEach(round => {
            if (round === this.state.roundData.name.toLowerCase()) {
              this.setState({
                roundSubmitted: true,
                userSubmittedEntry: usersEntry[0],
                submittedEntries: entryList,
                userSubmittedPreviously: true,
                loading: false
              })
            } else {
              this.setState({
                userSubmittedPreviously: true,
                submittedEntries: entryList,
                userSubmittedEntry: usersEntry[0],
                loading: false
              });
            }
          })
        }

      } else {
        this.setState({
          loading: false
        })
      }

    });
  }

  renderSelectionParlay(selection) {
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

  renderPreviousSelections() {
    if (this.state.roundSubmitted === true) {
      return (
        <Container component="main" maxWidth="sm">
          <Paper className="round-selections paper-selections">
            <Typography component="h1" variant="h5">
              Your Selections
            </Typography>
            {
              this.state.userSubmittedEntry.selections[this.state.roundData.roundNumber-1].map((selection) => {
                return (
                  <div key={selection.game}>
                    <p>Game {selection.game[selection.game.length -1]}</p>
                    <ul>
                      <li>Winner: {selection.teamSelection}</li>
                      <li>Over/Under: {selection.overUnderSelection}</li>
                      {this.renderSelectionParlay(selection.parlay)}
                    </ul>
                    <Divider />
                  </div>
                )
              })
            }
          </Paper>
        </Container>
      )
    }
  }
  
  renderSubmittedState() {
    if (this.state.roundSubmitted === true) {
      return '(Submitted)'
    }
  }

  onCreateEntry = (event, authUser, roundName) => {
    event.preventDefault();
    if (this.state.userSubmittedPreviously === true) {
      this.props.firebase.entry(this.state.userSubmittedEntry.uid).set({
        selections: [...this.state.userSubmittedEntry.selections, this.state.userSelections],
        roundsComplete: [...this.state.userSubmittedEntry.roundsComplete, roundName],
        updatedAt: this.props.firebase.serverValue.TIMESTAMP,
        createdAt: this.state.userSubmittedEntry.createdAt,
        userId: this.state.userSubmittedEntry.userId,
        username: this.state.userSubmittedEntry.username        
      })    
    } else {
      this.props.firebase.entries().push({
        userId: authUser.uid,
        username: authUser.username,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
        selections: [this.state.userSelections],
        roundsComplete: [roundName]
      });
    }
  };

  renderFormOrPreviousSelections() {
    if (this.state.loading === true) {
      return (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )
    } else {
        if (this.state.roundSubmitted === false) {
          return (
            <React.Fragment>
              <div className="round-choices" key={this.state.roundData.roundNumber}>
                <Typography component="h1" variant="h4">
                  {this.state.roundData.name} Round {this.renderSubmittedState()}
                </Typography>
                <form onSubmit={event => this.onCreateEntry(event, this.props.authUser, this.state.roundData.name.toLowerCase()) }>
                  <Grid container spacing={3}>
                  {
                    this.state.roundData.gameData.map(game => {
                      return(
                        <Grid item xs={12} sm={12} md={6} key={'round-'+this.state.roundData.roundNumber+'-game-'+game.gameNumber}>
                          <Game 
                            gameId={'round-'+this.state.roundData.roundNumber+'-game-'+game.gameNumber} 
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
                              <div key={game.game}>
                                <p><strong>Selection {i+1}</strong></p>
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
                        
                        <Button variant="contained" type="submit" color="primary" className="submit-button">Submit {this.state.roundData.name} Selections</Button>
                      </Paper>
                    </Container>
                  }
                  
                </form>
              </div>
            </React.Fragment>
          )
        } else {
          return (
            <React.Fragment>
              {this.renderPreviousSelections()}
            </React.Fragment>
          )
        }
    }
  }

  

 
  render() {
    return (
      <div className="round-container">
        {this.renderFormOrPreviousSelections()}
      </div>
    )
  }
}

export default withFirebase(Round);