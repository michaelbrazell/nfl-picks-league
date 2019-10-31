import React from 'react';

import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import './Editor.css'


class Editor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      round: 'wildcard'
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.setState({
      round: event.target.value,
    })
  }

  render() {
    return (
      <div className="admin-game-form">
        <h2>{this.state.round}</h2>
        <form>
          <FormControl autocomplete="off">
            <InputLabel htmlFor="round">Round</InputLabel>
            <Select
              value={this.state.round}
              onChange={this.handleChange}
              className="round-select"
              inputProps={{
                name: 'round',
                id: 'round-simple',
              }}
            >
              <MenuItem value='wildcard'>Wildcard</MenuItem>
              <MenuItem value='divisional'>Divisional</MenuItem>
              <MenuItem value='championship'>Championship</MenuItem>
              <MenuItem value='superbowl'>Super Bowl</MenuItem>
            </Select>
          </FormControl>
          <Paper className="game">
            <h3>Game 1</h3>
            <div className="row-container">
              <div>Team</div>
              <div>Spread</div>
              <div>Points</div>
            </div>
            <div className="row-container away-team-row">
              <div>
                <TextField
                  id="away-team-name"
                  label="Away Team Name"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="away-team-spread"
                  label="Spread"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="away-team-points-scored"
                  label="Points"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="row-container home-team-row">
              <div>
                <TextField
                  id="home-team-name"
                  label="Home Team Name"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="home-team-spread"
                  label="Spread"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div>
                <TextField
                  id="home-team-points-scored"
                  label="Points"
                  margin="dense"
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
          </Paper>
          
        </form>
      </div>
    )
  }
}


export default Editor;