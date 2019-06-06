import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import WelcomeBox from './welcomeBox'
import NewSimulation from './newSimulation'
import background from '../../assets/images/geometric.jpg'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#000000',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    }
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: theme.spacing(80)
  },
  innerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: theme.spacing(70)
  },
  createBtn: {
    alignSelf: 'center',
    textAlign: 'center'
  },
  link: {
    cursor: 'pointer'
  }
})

class Splash extends React.Component {
  state = { simulations: [], formVisible: true }

  async componentDidMount () {
    const { simulations } = await this.fetchSimulations()
    this.setState({ simulations })
  }

  async fetchSimulations () {
    const response = await axios.get('/api/simulations')
    return response.data
  }

  currentComponent = () => {
    const { formVisible, simulations } = this.state
    if (formVisible) {
      return <NewSimulation visible={formVisible} toggleForm={this.toggleForm} />
    }

    return <WelcomeBox simulations={simulations} showForm={this.toggleForm} />
  }

  toggleForm = (e) => {
    this.setState(state => ({ formVisible: !state.formVisible }))
  }

  render () {
    const { classes } = this.props

    return (
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Paper elevation={24} className={classes.paper}>
          {this.currentComponent()}
        </Paper>
      </Container>
    )
  }
}
Splash.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Splash)
