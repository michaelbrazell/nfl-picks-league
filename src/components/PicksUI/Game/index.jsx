import React from 'react';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSelected: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      teamSelected: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form>
          <label>
            <input type="radio" value={this.props.awayTeam} checked={this.state.teamSelected === this.props.awayTeam} onChange={this.handleChange}/>
            {this.props.awayTeam} {this.props.awayTeamSpread}
          </label>
          <label>
            <input type="radio" value={this.props.homeTeam} checked={this.state.teamSelected === this.props.homeTeam} onChange={this.handleChange}/>
            {this.props.homeTeam} {this.props.homeTeamSpread}
          </label>
        </form>
        <p>You selected: {this.state.teamSelected}</p>
      </div>
    )
  }
}

export default Game;