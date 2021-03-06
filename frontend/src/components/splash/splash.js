import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'

import Logo from '../logo'
import WelcomeBox from './welcomeBox'
import NewSimulation from './newSimulation'
import background from '../../assets/images/geometric.jpg'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#000000',
      backgroundAttachment: 'fixed',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    }
  },
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: theme.spacing(80)
  }
})

class Splash extends React.Component {
  state = { simulations: [], formVisible: false }

  async componentDidMount () {
    const { simulations } = await this.fetchSimulations()
    this.setState({ simulations })
  }

  async fetchSimulations () {
    const response = await axios.get('/api/simulations')
    return response.data
  }

  handleDeleteSimulations = async () => {
    await axios.delete('/api/simulations')
    this.setState({ simulations: [] })
  }

  currentComponent = () => {
    const { formVisible, simulations } = this.state
    if (formVisible) {
      return <NewSimulation visible={formVisible} toggleForm={this.toggleForm} />
    }

    return <WelcomeBox simulations={simulations} showForm={this.toggleForm} handleDeleteSimulations={this.handleDeleteSimulations} />
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
          <Logo />
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
