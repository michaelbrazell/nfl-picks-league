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

  onHandleOverUnder = (gameId, selection) => {
    let overUnderSelections = {
      "game":gameId,
      "selection":selection
    }

    let matchedGameId = this.state.userSelections.find(obj => obj.game === gameId);

    if (matchedGameId) {
      matchedGameId.selection = selection;
      this.setState(prevState => {
        console.log(prevState)
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
    
  }
  
  render() {
    return (
      <React.Fragment>
        {console.log('User Selections State:', this.state.userSelections)}
        {
          this.state.roundData.map(round => {
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
                          overUnder="53.5"
                          onOverUnderSelection={this.onHandleOverUnder.bind(this)}
                        />
                      )
                    })
                  }
                  </div>
                  <Button variant="contained" type="submit" color="primary">Submit {round.name} Round</Button>
                </form>
              </div>
            )
          })
        }

      </React.Fragment>
    )
  }
}


export default Round;