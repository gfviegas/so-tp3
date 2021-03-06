import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import ReactTerminal, { ReactThemes } from 'react-terminal-component'
import { EmulatorState, OutputFactory, Outputs } from 'javascript-terminal'

import Header from '../header'
import background from '../../assets/images/geometric.jpg'
import InstructionsTable from './instructionsTable'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#000000',
      backgroundAttachment: 'fixed',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    }
  },
  gridContainer: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  root: {
    display: 'flex',
    justifyContent: 'center'
  },
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  title: {
    marginBottom: theme.spacing(2)
  },
  input: {
    opacity: 0,
    position: 'absolute',
    top: 0,
    left: 0
  },
  buttonContainer: {
    marginTop: theme.spacing(4),
    position: 'relative',
    alignSelf: 'center'
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  terminal: {
    height: theme.spacing(130)
  }
})

class SimulationExpress extends React.Component {
  constructor (props) {
    super(props)
    this.fileInput = React.createRef()

    const emulatorState = EmulatorState.createEmpty()
    const outputs = emulatorState.getOutputs()

    this.state = { loading: false, emulatorState, outputs }
    this.simulationId = props.match.params.simulationId
  }

  componentDidMount () {
    window.scrollTo(0, 0)
    this.addRecord('\t ****** Terminal Output ******')
  }

  addRecord = async (output) => {
    const { emulatorState } = this.state
    let outputs = emulatorState.getOutputs()

    outputs = Outputs.addRecord(outputs, OutputFactory.makeTextOutput(output))
    return this.setState({ outputs, emulatorState: emulatorState.setOutputs(outputs) })
  }

  openFileInput = () => {
    this.fileInput.current.click()
  }

  fileInputChange = async (e) => {
    const { files } = e.target
    const fd = new window.FormData()
    fd.append('file', files[0])

    this.setState({ loading: true })
    await this.addRecord(`\n \t Carregado o arquivo ${files[0].name}.`)
    await this.addRecord(`\n \t Processando....`)

    try {
      const { output } = (await axios.post(`/api/simulations/${this.simulationId}/express`, fd)).data
      await this.addRecord(output.join('\n'))
    } catch (e) {
      await this.addRecord(`\n \t Erro: ${e}`)
      console.error(e)
    } finally {
      this.setState({ loading: false })
    }
  }

  render () {
    const { loading, emulatorState } = this.state
    const { classes, match } = this.props

    return (
      <section>
        <CssBaseline />
        <Header match={match} />
        <div className={classes.root}>
          <Grid container spacing={4} className={classes.gridContainer}>
            <Grid item md={5}>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h3' className={classes.title}> Modo Express </Typography>
                <Divider />
                <Typography variant='body2'> Use esse campo para incluir um arquivo com uma sequência de instruções para o simulador do sistema de arquivos. </Typography>
                <Typography variant='body2'> Seu arquivo <strong>deve</strong> possuir a extensão .txt, onde cada linha é uma instrução a ser executada.  </Typography>

                <input onChange={this.fileInputChange} accept='.txt' className={classes.input} id='inputBtn' type='file' ref={this.fileInput} />
                <label htmlFor='inputBtn' className={classes.buttonContainer}>
                  <Button variant='contained' color='secondary' component='span' disabled={loading} className={classes.button}> Selecionar Arquivo </Button>
                  {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                </label>
              </Paper>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h6' className={classes.title}> Formato das Instruções </Typography>
                <Typography variant='body2'>
                  O padrão das instruções segue o mesmo estilo UNIX. Note que as operações são executadas com o diretório de trabalho inicialmente em / (diretório-raiz). As operações implementadas são descritas na tabela abaixo:
                </Typography>
                <InstructionsTable />
              </Paper>
            </Grid>
            <Grid item md={7}>
              <Paper elevation={24} className={[classes.paper, classes.terminal].join(' ')}>
                <ReactTerminal theme={{ ...ReactThemes.dye, height: '100%' }} acceptInput={false} emulatorState={emulatorState} />
              </Paper>
            </Grid>

          </Grid>
        </div>

      </section>
    )
  }
}
SimulationExpress.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimulationExpress)
