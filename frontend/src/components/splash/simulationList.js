import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt'

const styles = theme => ({
  link: {
    cursor: 'pointer'
  }
})

class SimulationList extends React.Component {
  render () {
    const { simulations, classes } = this.props

    return (
      <List className={classes.root}>
        {simulations.map(s => (
          <div key={s}>
            <ListItem>
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
          </div>
        ))}
      </List>
    )
  }
}
SimulationList.propTypes = {
  classes: PropTypes.object.isRequired,
  simulations: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default withStyles(styles, { withTheme: true })(SimulationList)
