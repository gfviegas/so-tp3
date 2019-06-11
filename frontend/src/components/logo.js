import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Zoom from '@material-ui/core/Zoom'

import logo from '../assets/images/topHatLogo.png'

const styles = theme => ({
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    height: theme.spacing(40)
  },
  title: {
    fontSize: theme.spacing(10),
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: theme.spacing(1),
    fontSize: theme.spacing(2.5)
  }
})

const Logo = (props) => {
  const { classes } = props

  return (
    <Zoom in style={{ transitionDelay: '300ms' }} timeout={1500}>
      <article>
        <section className={classes.logoWrapper}>
          <img src={logo} className={classes.logo} />
        </section>
        <section>
          <Typography variant='h1' color='textPrimary' align='center' className={classes.title}> TopHat FSS </Typography>
          <Typography variant='h2' color='textPrimary' align='center' className={classes.subtitle}> O Simulador de FileSystem que funciona como mágica! </Typography>
        </section>
      </article>
    </Zoom>
  )
}
Logo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(Logo)
