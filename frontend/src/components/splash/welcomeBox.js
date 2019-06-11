import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grow from '@material-ui/core/Grow'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import BasicFooter from '../basicFooter'
import SimulationList from './simulationList'

const styles = theme => ({
  logoWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  logo: {
    height: theme.spacing(50)
  },
  title: {
    fontSize: theme.spacing(12),
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: theme.spacing(1),
    fontSize: theme.spacing(3)
  },
  innerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: theme.spacing(45)
  },
  createBtn: {
    marginTop: theme.spacing(4),
    alignSelf: 'center',
    textAlign: 'center'
  }
})

class WelcomeBox extends React.Component {
  renderList = () => {
    const { simulations } = this.props

    if (simulations && simulations.length) {
      return (
        <SimulationList simulations={simulations} />
      )
    }

    return (
      <Typography variant='h5' color='error' align='center'> Lista vazia <span role='img' aria-label='sad'>😕</span> </Typography>
    )
  }

  render () {
    const { classes, showForm } = this.props

    return (
      <Grow in>
        <article>
          <Box mt={5} className={classes.innerBox}>
            <div>
              <p>Seja bem-vindo ao Simulador de Sistema de Arquivos! <br /> Crie uma nova simulação ou escolha uma existente na lista abaixo para retomar uma simulação antiga.</p>
            </div>
            {this.renderList()}
            <Button variant='contained' size='large' color='secondary' className={classes.createBtn} onClick={showForm}> Nova Simulação </Button>
          </Box>
          <Box mt={5}> <BasicFooter /> </Box>
        </article>
      </Grow>
    )
  }
}
WelcomeBox.propTypes = {
  classes: PropTypes.object.isRequired,
  showForm: PropTypes.func.isRequired,
  simulations: PropTypes.arrayOf(PropTypes.string).isRequired
}

export default withStyles(styles, { withTheme: true })(WelcomeBox)
