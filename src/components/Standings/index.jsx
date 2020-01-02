import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withFirebase } from '../Firebase';

import './Standings.css';

class StandingsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      standingsData: []
    }
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
          standingsData: entryList
        })

      } else {
        this.setState({
          loading: true
        })
      }

    });
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
                  <TableCell align="right">Ties</TableCell>
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
                      <TableCell align="right">{entry.wins}</TableCell>
                      <TableCell align="right">{entry.losses}</TableCell>
                      <TableCell align="right">{entry.ties}</TableCell>
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