import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/lab/Slider'
// import Switch from '@material-ui/core/Switch'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    height: 180
  },
  wrapper: {
    width: 100 + theme.spacing(2)
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
  buttonsSection: {
    display: 'flex',
    justifyContent: 'space-evenly'
  },
  btn: {
    alignSelf: 'center',
    textAlign: 'center'
  }
})

class NewSimulation extends React.Component {
  state = { checked: false, numBlocks: null, blockSize: null }

  updateBlockSize = (e, blockSize) => {
    this.setState({ blockSize })
  }

  render () {
    const { classes, toggleForm, visible } = this.props
    const { blockSize, numBlocks } = this.state

    return (
      <Grow direction='up' in={visible} mountOnEnter unmountOnExit>
        <article>
          <Typography variant='h2' color='textPrimary' align='center'> Nova Simulação </Typography>
          <Box mt={5} className={classes.innerBox}>
            <section>
              <p>Para criar uma nova simulação, basta preencher os paramêtros do sistema de arquivos no formulário abaixo.</p>
            </section>

            <form>

              <Typography id='label'>Tamanho do Bloco</Typography>
              <Slider
                className={classes.slider}
                value={blockSize}
                min={0}
                max={6}
                step={1}
                onChange={this.updateBlockSize}
              />

              <section className={classes.buttonsSection}>
                <Button variant='contained' size='large' className={classes.btn} onClick={toggleForm} > Voltar </Button>
                <Button variant='contained' size='large' color='secondary' className={classes.btn}> Criar Simulação </Button>
              </section>
            </form>
          </Box>
        </article>
      </Grow>
    )
  }
}
NewSimulation.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleForm: PropTypes.func.isRequired,
  visible: PropTypes.bool
}

export default withStyles(styles, { withTheme: true })(NewSimulation)
