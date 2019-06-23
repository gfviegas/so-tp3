import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    width: '100%'
  },
  fileTitle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-end'
  },
  divider: {
    width: '100%',
    margin: '1rem auto'
  }
})

class FileInfo extends React.Component {
  render () {
    const { classes, file } = this.props

    if (file && file.name) {
      return (
        <section className={classes.root} >
          <div className={classes.fileTitle}>
            <Typography variant='h4'> {file.name} </Typography>
            <Typography variant='overline'> <strong> {file.size} </strong> bytes. </Typography>
          </div>
          <Divider variant='middle' className={classes.divider} />
          <Typography variant='body2'> {file.content} </Typography>
        </section>
      )
    }

    return (
      <section className={classes.root} >
        <div className={classes.fileTitle}>
          <Typography variant='h5'> Nenhum arquivo aberto </Typography>
        </div>
        <Divider variant='middle' className={classes.divider} />
      </section>
    )
  }
}

FileInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  file: PropTypes.object
}

export default withStyles(styles, { withTheme: true })(FileInfo)
