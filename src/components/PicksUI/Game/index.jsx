import React from 'react';

import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import './Game.css'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teamSelected: '',
      overUnderSelected: '',
      parlay: false
    }
    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.handleOverUnderChange = this.handleOverUnderChange.bind(this);
    this.handleParlayChange = this.handleParlayChange.bind(this);
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
    this.props.onOverUnderSelection(this.props.gameId, event.target.value)
  }

  handleParlayChange(event) {
    console.log('Parlay value ='+ event.target.value)
    this.setState({
      parlay: event.target.value
    })
  }

  renderGameStatus() {
    if (this.state.teamSelected.length > 0 && this.state.overUnderSelected.length > 0) {
      return 'game selected'
    } else {
      return 'game'
    }
  }

  render() {
    return (
      <Paper className={this.renderGameStatus()}>
        <FormControl component="fieldset" className="game-selection-form">
          <FormLabel component="legend">{this.props.awayTeam} ({this.props.awayTeamSpread}) at {this.props.homeTeam} ({this.props.homeTeamSpread}) | Points: {this.props.overUnder}</FormLabel>
          <div className="game-grid">
            <div className="grid-left">
              <RadioGroup aria-label={'team-select-'+ this.props.gameId} name={'team-select-'+ this.props.gameId} value={this.state.teamSelected} onChange={this.handleTeamChange}>
                <FormControlLabel value={this.props.awayTeam} control={<Radio />} label={this.props.awayTeam + ' (' + this.props.awayTeamSpread + ')'} />
                <FormControlLabel value={this.props.homeTeam} control={<Radio />} label={this.props.homeTeam + ' (' + this.props.homeTeamSpread + ')'} />
              </RadioGroup>
              <p>You selected: {this.state.teamSelected}</p>
            </div>  
            <div className="grid-right">
              <RadioGroup aria-label={'over-under-select-'+ this.props.gameId} name={'over-under-select-'+ this.props.gameId} value={this.state.overUnderSelected} onChange={this.handleOverUnderChange}>
                <FormControlLabel value='Under' control={<Radio />} label={'Under ' + this.props.overUnder} />
                <FormControlLabel value='Over' control={<Radio />} label={'Over ' + this.props.overUnder} />
              </RadioGroup>
              <p>You selected: {this.state.overUnderSelected}</p>
            </div>
          </div>
        </FormControl>
      </Paper>
    )
  }
}

export default Game;