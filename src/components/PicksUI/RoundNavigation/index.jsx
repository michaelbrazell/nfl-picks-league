import React from 'react';

import Grid from '@material-ui/core/Grid';

import './RoundNavigation.css'

class RoundNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      "selected": false
    }
  }

  renderRoundStyles() {
    if (this.props.selected === true) {
      return 'round active'
    } else {
      return 'round'
    }
  }

  render() {
    return (
      <Grid item xs={12} sm={3} key={this.props.roundNumber}>
        <div className={this.renderRoundStyles()} key={this.props.roundNumber} onClick={this.props.handleRoundChoice}>
          {this.props.name}
        </div>
      </Grid>
    )
  }
}

export default RoundNavigation;