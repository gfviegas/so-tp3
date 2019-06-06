import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import Grow from '@material-ui/core/Grow'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import BasicFooter from '../basicFooter'
import SimulationList from './simulationList'

const styles = theme => ({
  innerBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: theme.spacing(70)
  },
  createBtn: {
    alignSelf: 'center',
    textAlign: 'center'
  }
})

class WelcomeBox extends React.Component {
  render () {
    const { classes, showForm, simulations } = this.props

    return (
      <Grow in >
        <article>
          <Typography variant='h2' color='textPrimary' align='center'> FileSystem Simulator </Typography>
          <Box mt={5} className={classes.innerBox}>
            <div>
              <p>Seja bem-vindo ao Simulador de Sistema de Arquivos!</p>
              <p>Crie uma nova simulação ou escolha uma existente na lista abaixo para retomar uma simulação antiga.</p>
            </div>
            <SimulationList simulations={simulations} />
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
