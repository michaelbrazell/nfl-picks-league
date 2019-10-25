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

    // What follow is a bunch of code not being used.
    
    // Take the existing this.state.userSelections
    // Check to see if gameId matches
    // If so, remove that item, add the new one

    // // List of unique games
    // let uniqueGameSelections = this.state.userSelections.filter((selection, index, array) => {
    //   return selection.game !== gameId
    // })

    // console.log('Filterd Games: ', uniqueGameSelections)

    // Compare the state to this filtered list
    // If gameId in state matches gameId in this list, drop it in favor of the latest selection
    // let filteredState = this.state.userSelections.filter((selection, index, array) => {
    //   return selection.game !== filteredGameSelection.game
    // })

    // console.log('Filtered State: ', filteredState)
    
    let matchedGameId = this.state.userSelections.find(obj => obj.game === gameId);

    if (matchedGameId) {
      matchedGameId.selection = selection;
      this.setState(prevState => {
        let userSelections = Object.assign({}, prevState.userSelections);  // creating copy of state variable jasper
        if (userSelections.game === gameId) {
          userSelections.selection = selection
        }
        
        return { userSelections };                                 // return new object jasper object
      })
    } else {
      this.setState({
        userSelections: [...this.state.userSelections, overUnderSelections]
      })  
    }
    
    
    
    
    // if (this.state.userSelections.some(e => e.game === gameId)) {
    //   console.log('We have a match with ')
    // } else {
    //   this.setState({
    //     userSelections: [...this.state.userSelections, overUnderSelections]
    //   })  
    // }
  
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