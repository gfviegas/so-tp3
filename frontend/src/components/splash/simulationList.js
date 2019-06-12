import React from 'react'
import PropTypes from 'prop-types'

import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

const styles = theme => ({
  icon: {
    alignContent: 'center'
  },
  link: {
    cursor: 'pointer'
  }
})

class SimulationList extends React.Component {
  test = (s) => {
    const { history } = this.props
    history.push(`/simulacao/${s}`)
  }

  render () {
    const { simulations, classes } = this.props

    return (
      <List className={classes.root}>
        {simulations.map(s => (
          <div key={s}>
            <ListItem>
              <Link className={classes.link} to={null} onClick={() => this.test(s)}>
                <ListItemIcon className={classes.icon}>
                  <ArrowRightAltIcon />
                </ListItemIcon>
              </Link>

              <Link className={classes.link} to={null} onClick={() => this.test(s)}>
                <ListItemText primary={`Simulação #` + s} />
              </Link>
            </ListItem>
            <Divider variant='inset' component='li' />
          </div>
        ))}
      </List>
    )
  }
}
SimulationList.propTypes = {
  history: PropTypes.object,
  classes: PropTypes.object.isRequired,
  simulations: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default withRouter(withStyles(styles, { withTheme: true })(SimulationList))
