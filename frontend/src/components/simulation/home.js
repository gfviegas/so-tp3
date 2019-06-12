import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Header from '../header'
import background from '../../assets/images/geometric.jpg'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#000000',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    }
  },
  gridContainer: {
    width: '100%'
  },
  root: {
    alignContent: 'center'
  }
})

class SimulationHome extends React.Component {
  componentDidMount () {
    this.fetchSimulationInfo(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchSimulationInfo(nextProps)
  }

  fetchSimulationInfo = async (props) => {
    const { match } = props
    const { simulationId } = match.params

    console.log(simulationId)
    try {
      const response = await axios.get(`/api/simulations/${simulationId}`)
      this.setState({ response })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    const { classes, match } = this.props

    return (
      <section>
        <CssBaseline />
        <Header match={match} />
        <Grid container spacing={2} className={classes.gridContainer}>
          <Grid item xs={2}>
            <Container component='main' maxWidth='md'>
              <Paper elevation={24} className={classes.paper}>
                <p> {JSON.stringify(match)} </p>
              </Paper>
            </Container>
          </Grid>

          <Grid item xs={6}>
            <Container component='main' maxWidth='md'>
              <Paper elevation={24} className={classes.paper}>
                <p> {JSON.stringify(match)} </p>
              </Paper>
            </Container>
          </Grid>

          <Grid item xs={4}>
            <Container component='main' maxWidth='md'>
              <Paper elevation={24} className={classes.paper}>
                <p> {JSON.stringify(match)} </p>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </section>
    )
  }
}
SimulationHome.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimulationHome)
