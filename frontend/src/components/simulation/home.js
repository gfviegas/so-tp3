import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Header from '../header'
import FileTree from './fileTree'
import FileInfo from './fileInfo'
import RenameDialog from './renameDialog'
import CreateDialog from './createDialog'
import background from '../../assets/images/geometric.jpg'
import { toKB } from '../../utils/sizes'

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: '#000000',
      backgroundAttachment: 'fixed',
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover'
    }
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
  gridContainer: {
    marginTop: theme.spacing(2),
    justifyContent: 'space-around',
    width: '100%'
  },
  fileTreeContainer: {
    display: 'flex',
    flexGrow: 1
  },
  fileTree: {
    width: '100%'
  },
  fileInfo: {
    width: '100%'
  },
  statDescription: {
    paddingTop: theme.spacing(2),
    color: '#81005d',
    fontWeight: 500
  }
})

class SimulationHome extends React.Component {
  activeItem = null

  constructor (props) {
    super(props)

    const inode = {
      wd: 'root/',
      items: []
    }
    const currentFile = null

    this.state = { simulation: null, inode, currentFile, renameDialogOpen: false, renameDialogCurrentName: null, createDialogOpen: false }
    this.simulationId = props.match.params.simulationId
  }

  componentDidMount () {
    this.fetchSimulationInfo(this.props)
    this.fetchWDInfo()
  }

  componentWillReceiveProps (nextProps) {
    this.fetchSimulationInfo(nextProps)
  }

  treatInodeList = (inodeList) => {
    return inodeList.map(i => Object.assign(i, { open: false }))
  }

  fetchSimulationInfo = async () => {
    try {
      const { data } = await axios.get(`/api/simulations/${this.simulationId}`)
      this.setState({ simulation: data })
    } catch (e) {
      // TODO: Go home!
      console.error(e)
    }
  }

  fetchWDInfo = async () => {
    try {
      const { data } = await axios.get(`/api/simulations/${this.simulationId}/directory`)
      let { inode } = this.state
      inode = data
      inode.items = this.treatInodeList(data.items)
      this.setState({ inode })
    } catch (e) {
      console.error(e)
    }
  }

  handleItemOpen = async (item) => {
    const { inode } = this.state

    // TODO: Chamar api..

    // Se for arquivo...
    if (item.type === 'file') {
      inode.items = inode.items.map(i => {
        const open = (i.name === item.name)
        return { ...i, open }
      })

      try {
        const { data } = await axios.get(`/api/simulations/${this.simulationId}/file`, { params: { file: item.name } })
        const currentFile = data
        currentFile.createdAt = new Date(currentFile.createdAt).toLocaleString('pt-BR')
        currentFile.updatedAt = new Date(currentFile.updatedAt).toLocaleString('pt-BR')
        return this.setState({ inode, currentFile })
      } catch (e) {
        console.error(e)
      }

      return
    }

    // Se for diretorio...
    try {
      const { data } = await axios.put(`/api/simulations/${this.simulationId}/directory`, { directory: item.name })
      inode.items = this.treatInodeList(data)
      inode.wd += `${item.name}/`
      return this.setState({ inode })
    } catch (e) {
      console.error(e)
    }
  }

  handleItemDelete = async (item) => {
    const { inode } = this.state

    // TODO: Verificar se é diretório, chamar api..
    inode.items = inode.items.filter(i => i.name !== item.name)
    this.setState({ inode })
  }

  handleItemRename = async (item) => {
    this.activeItem = item
    this.setState({ renameDialogCurrentName: item.name, renameDialogOpen: true })
  }

  closeRenameDialog = () => {
    this.setState({ renameDialogOpen: false })
  }

  submitRenameDialog = (fileName) => {
    console.log(fileName)
    this.closeRenameDialog()

    this.activeItem.name = fileName
  }

  createFile = () => {
    this.setState({ createDialogOpen: true, createDialogType: 'file' })
  }

  createFolder = () => {
    this.setState({ createDialogOpen: true, createDialogType: 'folder' })
  }

  closeCreateDialog = () => {
    this.setState({ createDialogOpen: false })
  }

  submitCreateDialog = async (payload) => {
    const { inode } = this.state
    this.closeCreateDialog()

    // É arquivo ou diretório?
    const url = (payload.content) ? `/api/simulations/${this.simulationId}/file` : `/api/simulations/${this.simulationId}/directory`

    const { data } = await axios.post(url, payload)
    inode.items = data.map(i => Object.assign(i, { open: false }))
    this.setState({ inode })
  }

  render () {
    const { simulation, inode, currentFile, renameDialogOpen, renameDialogCurrentName, createDialogOpen, createDialogType } = this.state
    const { classes, match } = this.props

    if (!simulation) return <div />
    return (
      <section>
        <CssBaseline />
        <Header match={match} />
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item md={3}>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h5'> Tamanho de Disco </Typography>
                <Typography className={classes.statDescription} variant='body2'> {toKB(simulation.diskSize)} KB </Typography>
              </Paper>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h5'> Tamanho de Bloco </Typography>
                <Typography className={classes.statDescription} variant='body2'> {simulation.blockSize} Bytes </Typography>
              </Paper>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h5'> Quantidade de Blocos </Typography>
                <Typography className={classes.statDescription} variant='body2'> {simulation.numBlocks} blocos </Typography>
              </Paper>
            </Grid>

            <Grid item md={3}>
              <Paper elevation={24} className={[classes.paper, classes.fileTreeContainer].join(' ')}>
                <FileTree
                  className={classes.fileTree}
                  inode={inode}
                  onItemOpen={this.handleItemOpen}
                  onItemDelete={this.handleItemDelete}
                  onItemRename={this.handleItemRename}
                  handleNewFile={this.createFile}
                  handleNewFolder={this.createFolder}
                />
              </Paper>
            </Grid>

            <Grid item md={6}>
              <Paper elevation={24} className={classes.paper}>
                <FileInfo file={currentFile} className={classes.fileInfo} />
              </Paper>
            </Grid>
          </Grid>
        </div>

        <RenameDialog open={renameDialogOpen} handleClose={this.closeRenameDialog} handleSubmit={this.submitRenameDialog} currentName={renameDialogCurrentName} />
        <CreateDialog open={createDialogOpen} handleClose={this.closeCreateDialog} handleSubmit={this.submitCreateDialog} type={createDialogType} />
      </section>
    )
  }
}
SimulationHome.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(SimulationHome)
