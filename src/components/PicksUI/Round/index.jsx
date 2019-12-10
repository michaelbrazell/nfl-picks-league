import React from 'react';
import Game from '../Game'

import Button from '@material-ui/core/Button';

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
  
  render() {
    return (
      <React.Fragment>
        {console.log('User Selections State:', this.state.userSelections)}
        {
          this.state.roundData.map(round => {
            if (round.selected === true) {
              return (
                <div className="foo" key={round.roundNumber}>
                  <h3>{round.name} Round</h3>
                  <form onSubmit={event => this.onCreateSelections(event) }>
                    <div className="games-grid">
                    {
                      round.gameData.map(game => {
                        return(
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
                        )
                      })
                    }
                    </div>
                    <Button variant="contained" type="submit" color="primary">Submit {round.name} Round</Button>
                  </form>
                </div>
              )

            }
          })
        }

      </React.Fragment>
    )
  }
}


export default Round;