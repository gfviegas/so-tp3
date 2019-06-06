import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'
import { withStyles } from '@material-ui/core/styles'
import Grow from '@material-ui/core/Grow'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Slider from '@material-ui/lab/Slider'
import Button from '@material-ui/core/Button'

import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

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
  },
  sliderLabel: {
    paddingBottom: theme.spacing(2)
  },
  sliderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  slider: {
    width: '80%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flexGrow: '1'
  }
})

class NewSimulation extends React.Component {
  state = { checked: false, numBlocks: 0, blockSize: 0, snackbarMessage: null }

  updateBlockSize = (e, blockSize) => {
    this.setState({ blockSize })
  }

  updateNumBlocks = (e, numBlocks) => {
    this.setState({ numBlocks })
  }

  createSimulation = async (e) => {
    const { blockSize, numBlocks } = this.state
    const payload = { blockSize, numBlocks }

    console.log(payload)

    try {
      const { data } = await axios.post('/api/simulations', payload)
      this.setState({ snackbarMessage: `Simulação criada! #${data.id}` })
    } catch (e) {
      this.setState({ snackbarMessage: `Erro! #${e.message}` })
    }
  }

  render () {
    const { classes, toggleForm, visible } = this.props
    const { blockSize, numBlocks, snackbarMessage } = this.state

    return (
      <Grow direction='up' in={visible} mountOnEnter unmountOnExit>
        <article>
          <Typography variant='h2' color='textPrimary' align='center'> Nova Simulação </Typography>
          <Box mt={5} className={classes.innerBox}>
            <section>
              <p>Para criar uma nova simulação, basta preencher os paramêtros do sistema de arquivos no formulário abaixo.</p>
            </section>
            <form className={classes.form}>
              <div>
                <InputLabel htmlFor='blockSizeSlider' className={classes.sliderLabel}> Tamanho do Bloco </InputLabel>
                <div className={classes.sliderContainer}>
                  <Slider id='blockSizeSlider' className={classes.slider} value={blockSize} min={0} max={1024} step={2} onChange={this.updateBlockSize} />
                  <Typography className={classes.sliderValue}> {blockSize} Bytes </Typography>
                </div>
              </div>
              <div>
                <InputLabel htmlFor='numBlocksSlider' className={classes.sliderLabel}> Número de Blocos </InputLabel>
                <div className={classes.sliderContainer}>
                  <Slider id='numBlocksSlider' className={classes.slider} value={numBlocks} min={10} max={100} step={1} onChange={this.updateNumBlocks} />
                  <Typography className={classes.sliderValue}> {numBlocks} Blocos </Typography>
                </div>
              </div>
            </form>
            <section className={classes.buttonsSection}>
              <Button variant='contained' size='large' className={classes.btn} onClick={toggleForm}> Voltar </Button>
              <Button variant='contained' size='large' color='secondary' className={classes.btn} onClick={this.createSimulation}> Criar Simulação </Button>
            </section>
          </Box>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snackbarMessage && snackbarMessage.length}
            ContentProps={{ 'aria-describedby': 'snackbar-content' }}
            message={<span id='snackbar-content'> {snackbarMessage} </span>}
          />
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
