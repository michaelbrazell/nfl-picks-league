import React from 'react';

import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSelected: '',
      overUnderSelected: ''
    }
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleOverUnderChange = this.handleOverUnderChange.bind(this);
  }
  
  handleTeamChange(event) {
    this.setState({
      teamSelected: event.target.value,
    })
  }

  handleOverUnderChange(event) {
    this.setState({
      overUnderSelected: event.target.value
    })
  }

  render() {
    return (
      <div className="game">
        <h3>{this.props.awayTeam} at {this.props.homeTeam}</h3>
        <p></p>
        <form>
          <label>
            <input type="radio" value={this.props.awayTeam} checked={this.state.teamSelected === this.props.awayTeam} onChange={this.handleTeamChange}/>
            {this.props.awayTeam} {this.props.awayTeamSpread}
          </label>
          <label>
            <input type="radio" value={this.props.homeTeam} checked={this.state.teamSelected === this.props.homeTeam} onChange={this.handleTeamChange}/>
            {this.props.homeTeam} {this.props.homeTeamSpread}
          </label>
        </form>
        <p>You selected: {this.state.teamSelected}</p>
        <form>
          <label>
            <input type="radio" value='under' checked={this.state.overUnderSelected === 'under'} onChange={this.handleOverUnderChange}/>
            Under
          </label>
          <label>
            <input type="radio" value='over' checked={this.state.overUnderSelected === 'over'} onChange={this.handleOverUnderChange}/>
            Over
          </label>
        </form>
        <p>You selected: {this.state.overUnderSelected}</p>
      </div>
    )
  }
}

export default Game;