import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'
import Button from '@material-ui/core/Button'

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
  state = { simulations: [] }

  async componentDidMount () {
    const { simulations } = await this.fetchSimulations()
    console.log(simulations)
    this.setState({ simulations })
  }

  async fetchSimulations () {
    const response = await axios.get('/api/simulations')
    return response.data
  }

  customFooter () {
    return (
      <footer>
        <Typography variant='body2' color='textSecondary' align='center'> Sistemas Operacionais - Ciência da Computação </Typography>
        <hr />
        <Typography variant='body2' color='textSecondary' align='center'> Universidade Federal de Viçosa, Campus Florestal </Typography>
      </footer>
    )
  }

  simulationList (classes) {
    if (!this.state.simulations || !this.state.simulations.length) return

    return this.state.simulations.map(s => (
      <List className={classes.root}>
        <ListItem key={s}>
          <Link className={classes.link}>
            <ListItemIcon>
              <ArrowRightAltIcon />
            </ListItemIcon>
          </Link>

          <Link className={classes.link}>
            <ListItemText primary={`Simulação #` + s} />
          </Link>
        </ListItem>
        <Divider variant='inset' component='li' />
      </List>
    ))
  }

  render () {
    const { classes } = this.props

    return (
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography variant='h2' color='textPrimary' align='center'> FileSystem Simulator </Typography>
          <Box mt={5} className={classes.innerBox}>
            <div>
              <p>Seja bem-vindo ao Simulador de Sistema de Arquivos!</p>
              <p>Crie uma nova simulação ou escolha uma existente na lista abaixo para retomar uma simulação antiga.</p>
            </div>

            {this.simulationList(classes)}
            <Button variant='contained' size='large' color='secondary' className={classes.createBtn}> Nova Simulação </Button>
          </Box>
          <Box mt={5}>
            {this.customFooter()}
          </Box>
        </Paper>
      </Container>
    )
  }
}
Splash.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Splash)
