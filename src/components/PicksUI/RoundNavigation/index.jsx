import React from 'react';

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
      <div className={this.renderRoundStyles()} key={this.props.roundNumber} onClick={this.props.handleRoundChoice}>
        {this.props.name}
      </div>
    )
  }
}

export default RoundNavigation;