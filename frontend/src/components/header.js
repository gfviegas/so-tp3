import React from 'react'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import { routes } from '../routes'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  headerLink: {
    color: theme.palette.common.white
  },
  header: {
    background: '#6a003c'
  }
})

class Header extends React.Component {
  render () {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <AppBar className={classes.header} position='static'>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              {routes.map((r, i) => (
                <Route
                  key={i}
                  path={r.path}
                  exact={r.exact}
                  component={r.header}
                />
              ))}
            </Typography>
            <Button color='inherit'> <Link to='/home' className={classes.headerLink}> Home </Link> </Button>
            <Button color='inherit'> <Link to='/teste' className={classes.headerLink}> Teste </Link> </Button>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Header)
