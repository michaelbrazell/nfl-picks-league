import React from 'react';
import Game from '../Game';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { withFirebase } from '../../Firebase';

import './Round.css';

class Round extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
  
        console.log('all entries', entryList)
  
        let usersEntry = entryList.filter((entry) => {
          return entry.userId === this.props.authUser.uid
        })
  
        console.log('user entry: ', usersEntry)
  
        if (usersEntry.length > 0) {
          this.setState({
            userSubmittedPreviously: true,
            userSubmittedEntry: usersEntry[0],
            submittedEntries: entryList,
          })
        } else {
          this.setState({
            submittedEntries: entryList
          });
        }

      }

    });
  }

  renderUserEntry(user) {
    // foo
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
    if (this.state.userSubmittedEntry.length > 0) {
      return (
        <div>
          <Typography component="h1" variant="h5">
            Your Previous Selections
          </Typography>
          {
            this.state.userSubmittedEntry.selections.map((selection) => {
              return (
                <div key={selection.game}>
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
        </div>
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
        updatedAt: this.props.firebase.serverValue.TIMESTAMP,
        createdAt: this.state.userSubmittedEntry.createdAt,
        userId: this.state.userSubmittedEntry.userId,
        username: this.state.userSubmittedEntry.username        
      })    
      console.log('Updating...', this.state.userSubmittedEntry.uid)  
    } else {
      this.props.firebase.entries().push({
        userId: authUser.uid,
        username: authUser.username,
        createdAt: this.props.firebase.serverValue.TIMESTAMP,
        selections: [this.state.userSelections]
      });
      console.log('Publishing New')  
      this.setState({
        roundSubmitted: true
      })
    }
  };
 
  render() {
    return (
      <React.Fragment>
        {this.state.roundData.map(round => {
        if (round.selected === true) {
          return (
            <div className="round-choices" key={round.roundNumber}>
              <Typography component="h1" variant="h4">
                {round.name} Round {this.renderSubmittedState()}
              </Typography>
              <form onSubmit={event => this.onCreateEntry(event, this.props.authUser, round.name.toLowerCase()) }>
                <Grid container spacing={3}>
                {
                  round.gameData.map(game => {
                    return(
                      <Grid item xs={12} sm={12} md={6} key={'round-'+round.roundNumber+'-game-'+game.gameNumber}>
                        <Game 
                          gameId={'round-'+round.roundNumber+'-game-'+game.gameNumber} 
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
                      
                      <Button variant="contained" type="submit" color="primary" className="submit-button">Submit {round.name} Selections</Button>
                    </Paper>
                  </Container>
                }
                {this.renderPreviousSelections()}
              </form>
            </div>
          )
        } else {
          return ''
        }
      })
      }
      </React.Fragment>
    )
  }
}

export default withFirebase(Round);