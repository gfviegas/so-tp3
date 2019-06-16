import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import logo from '../assets/images/topHatLogo.png'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    height: theme.spacing(8)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    fontWeight: 'bold',
    flexGrow: 1
  },
  headerLink: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  linkActive: {
    color: '#ec407a',
    fontWeight: 'bold',
    textDecoration: 'underline'
  },
  header: {
    // background: '#200012'
    background: '#000000de'
  }
})

class Header extends React.Component {
  render () {
    const { classes, match } = this.props
    const { simulationId } = match.params

    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position='static'>
          <Toolbar>
            <section className={classes.logoWrapper}>
              <img src={logo} className={classes.logo} alt='Logo' />
            </section>
            <Typography variant='h6' className={classes.title}> TopHat FSS </Typography>

            <Button color='inherit'>
              <NavLink exact to={`/simulacao/${simulationId}/express`} activeClassName={classes.linkActive} className={classes.headerLink}> Express </NavLink>
            </Button>
            <Button color='inherit'>
              <NavLink exact to={`/simulacao/${simulationId}`} activeClassName={classes.linkActive} className={classes.headerLink}> Interativo </NavLink>
            </Button>
            <Button color='inherit'>
              <NavLink exact to={`/`} className={classes.headerLink}> Sair </NavLink>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Header)
