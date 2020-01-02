import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import { withFirebase } from '../Firebase';

import './Standings.css';

class StandingsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      entries: [],
      standingsData: []
    }
  }

  scoreBracket() {
    let officialResults = []
    this.state.entries.forEach(entry => {
      if (entry.username === 'MikeTest') {
        officialResults = entry
      }
    })

    this.state.entries.forEach(entry => {
      if (entry.username !== 'MikeTest') {
        let gameResults = {
          username: entry.username,
          userId: entry.userId,
          uid: entry.uid,
          wins: [],
          losses: []
        }
        entry.selections.forEach(round => {
          round.forEach(game => {
            // Need to add in the parlay check
            officialResults.selections.forEach(officialRound => {
              officialRound.forEach(officialGame => {
                if (game.game === officialGame.game) {
                  if (game.teamSelection === officialGame.teamSelection) {
                    gameResults.wins.push([game.game, game.teamSelection])
                  } else {
                    gameResults.losses.push([game.game, game.teamSelection])
                  }
                  if (game.overUnderSelection === officialGame.overUnderSelection) {
                    gameResults.wins.push([game.game, game.overUnderSelection])
                  } else {
                    gameResults.losses.push([game.game, game.overUnderSelection])
                  }
                }
              })
            })
            
          })
        })
        this.setState({
          standingsData: [...this.state.standingsData, gameResults]
        })
        console.log('Results', this.state.standingsData)
      }
    })
  }

  componentDidMount() {
    this.props.firebase.entries().on('value', snapshot => {
      const entryObject = snapshot.val();

      // Make sure entries isn't empty
      if (entryObject !== null) {
        const entryList = Object.keys(entryObject).map(key => ({
          ...entryObject[key],
          uid: key,
        }));

        this.setState({
          loading: false,
          entries: entryList
        })

        this.scoreBracket()

      } else {
        this.setState({
          loading: true
        })
      }

    });
  }

  componentWillUnmount() {
    this.props.firebase.entries().off();
  }

  renderTooltipItems(items) {
    return (
      <React.Fragment>
        <p>Selections:</p>
        <ul className="standings-items">
          {items.map((item, i) => {
            return <li key={i+item[0]}>{item[0]}, {item[1]}</li>
          })}
        </ul>
      </React.Fragment>
    )
  }


  renderLoadingOrResults() {
    if (this.state.loading === true) {
      return (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )
    } else {
      return (
        <Container component="main" maxWidth="lg">
          <Paper>
            
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="order"></TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Wins</TableCell>
                  <TableCell align="right">Losses</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.standingsData.map((entry, i) => {
                  return (
                    <TableRow key={entry.userId}>
                      <TableCell className="order">{i+1}</TableCell>
                      <TableCell component="th" scope="row">
                        {entry.username}
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title={this.renderTooltipItems(entry.wins)} placement="top">
                          <span className="standings-context">{entry.wins.length}</span>
                        </Tooltip>
                        
                          
                        
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title={this.renderTooltipItems(entry.losses)} placement="top">
                          <span className="standings-context">{entry.losses.length}</span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      )
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.renderLoadingOrResults()}
      </React.Fragment>
    )
  }
}

export default withFirebase(StandingsPage);