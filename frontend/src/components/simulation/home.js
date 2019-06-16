import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import Header from '../header'
import FileTree from './fileTree'
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
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  fileTreeContainer: {
    display: 'flex',
    flexGrow: 1
  },
  fileTree: {
    width: '100%'
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
    const inode = {
      wd: '/',
      items: [
        { title: 'usr', type: 'folder' },
        { title: 'etc', type: 'folder' },
        { title: 'var', type: 'folder' },
        { title: 'log', type: 'folder' },
        { title: '2.txt', type: 'file' },
        { title: '3.txt', type: 'file' }
      ]
    }

    const { classes, match } = this.props

    return (
      <section>
        <CssBaseline />
        <Header match={match} />
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={2}>
              <Container component='main' maxWidth='md'>
                <Paper elevation={24} className={classes.paper}>
                  <p> {JSON.stringify(match)} </p>
                </Paper>
              </Container>
            </Grid>

            <Grid item xs={4}>
              <Paper elevation={24} className={[classes.paper, classes.fileTreeContainer].join(' ')}>
                <FileTree className={classes.fileTree} inode={inode} />
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper elevation={24} className={classes.paper}>
                <p> {JSON.stringify(match)} </p>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </section>
    )
  }
}
SimulationHome.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimulationHome)
