import React from 'react';

import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import Grid from '@material-ui/core/Grid';

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
    this.props.onSelectionChange('team', this.props.gameId, event.target.value)
  }

  handleOverUnderChange(event) {
    this.setState({
      overUnderSelected: event.target.value
    })
    this.props.onSelectionChange('overUnder', this.props.gameId, event.target.value)
  }

  // Not working yet
  handleParlayChange(event) {
    this.setState({
      parlay: event.target.checked
    })
    this.props.onSelectionChange('parlay', this.props.gameId, event.target.checked)
  }

  renderGameStatus() {
    if (this.state.teamSelected.length > 0 && this.state.overUnderSelected.length > 0) {
      if (this.state.parlay === true) {
        return 'game selected vibrate-1'
      } else {
        return 'game selected'
      }
      
    } else {
      return 'game'
    }
  }

  parlayLabel() {
    return (
      <span>
        Parlay this Game &nbsp;
        <Tooltip title="Parlaying a selection locks those two selections together.  If both hit, you get an extra win, but if one doesn't, you get a loss for both." placement="bottom">
          <span className="help-context">(<span className="dotted">What's this?</span>)</span>
        </Tooltip>
      </span>
    )
  }

  render() {
    return (
      <Paper className={this.renderGameStatus()}>
        <FormControl component="fieldset" className="game-selection-form">
          <FormLabel component="legend">{this.props.awayTeam} ({this.props.awayTeamSpread}) at {this.props.homeTeam} ({this.props.homeTeamSpread}) | Points: {this.props.overUnder}</FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7} md={7}>
              <RadioGroup aria-label={'team-select-'+ this.props.gameId} name={'team-select-'+ this.props.gameId} value={this.state.teamSelected} onChange={this.handleTeamChange}>
                <FormControlLabel value={this.props.awayTeam} control={<Radio />} label={this.props.awayTeam + ' (' + this.props.awayTeamSpread + ')'} />
                <FormControlLabel value={this.props.homeTeam} control={<Radio />} label={this.props.homeTeam + ' (' + this.props.homeTeamSpread + ')'} />
              </RadioGroup>
            </Grid>  
            <Grid item xs={12} sm={5} md={5}>
              <RadioGroup aria-label={'over-under-select-'+ this.props.gameId} name={'over-under-select-'+ this.props.gameId} value={this.state.overUnderSelected} onChange={this.handleOverUnderChange}>
                <FormControlLabel value='Under' control={<Radio />} label={'Under ' + this.props.overUnder} />
                <FormControlLabel value='Over' control={<Radio />} label={'Over ' + this.props.overUnder} />
              </RadioGroup>
            </Grid>
          </Grid>
          <Divider />
          <FormControlLabel
            control={
              <Switch checked={this.state.parlay} onChange={this.handleParlayChange} value='parlay' />
            }
            label={this.parlayLabel()}
          />
        </FormControl>
      </Paper>
    )
  }
}

export default Game;