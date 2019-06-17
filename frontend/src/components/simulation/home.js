import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import Header from '../header'
import FileTree from './fileTree'
import RenameDialog from './renameDialog'
import CreateDialog from './createDialog'
import background from '../../assets/images/geometric.jpg'

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
  statDescription: {
    paddingTop: theme.spacing(2),
    color: '#81005d',
    fontWeight: 500
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

class SimulationHome extends React.Component {
  activeItem = null

  constructor (props) {
    super(props)

    const inode = {
      wd: '/',
      items: [
        { title: 'usr', type: 'folder', open: false },
        { title: 'etc', type: 'folder', open: false },
        { title: 'var', type: 'folder', open: false },
        { title: 'log', type: 'folder', open: false },
        { title: '2.txt', type: 'file', open: true },
        { title: '3.txt', type: 'file', open: false }
      ]
    }

    const currentFile = {
      id: 9102109,
      title: '2.txt',
      content: '123456',
      size: 48
    }

    this.state = { inode, currentFile, renameDialogOpen: false, renameDialogCurrentName: null, createDialogOpen: false }
    this.simulationId = props.match.params.simulationId
  }

  componentDidMount () {
    this.fetchSimulationInfo(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.fetchSimulationInfo(nextProps)
  }

  fetchSimulationInfo = async (props) => {
    // const { match } = props
    // try {
    //   const response = await axios.get(`/api/simulations/${this.simulationId}`)
    //   this.setState({ response })
    // } catch (e) {
    //   console.error(e)
    // }
  }

  handleItemOpen = async (item) => {
    const { inode } = this.state

    // TODO: Chamar api..

    // Se for arquivo...
    if (item.type === 'file') {
      inode.items = inode.items.map(i => {
        const open = (i.title === item.title)
        return { ...i, open }
      })

      try {
        // const currentFile = await axios.get(`/api/simulations/${this.simulationId}/file/${item.id}`)

        // Isso é só um mock
        const currentFile = { ...item, id: 29191, content: new Date().toISOString(), size: parseInt(Math.random() * 15 + 20) }
        return this.setState({ inode, currentFile })
      } catch (e) {
        console.error(e)
      }
    }

    // Se for diretorio...
    this.setState({ inode })
  }

  handleItemDelete = async (item) => {
    const { inode } = this.state

    // TODO: Verificar se é diretório, chamar api..
    inode.items = inode.items.filter(i => i.title !== item.title)
    this.setState({ inode })
  }

  handleItemRename = async (item) => {
    this.activeItem = item
    this.setState({ renameDialogCurrentName: item.title, renameDialogOpen: true })
  }

  closeRenameDialog = () => {
    this.setState({ renameDialogOpen: false })
  }

  submitRenameDialog = (fileName) => {
    console.log(fileName)
    this.closeRenameDialog()

    this.activeItem.title = fileName
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

  submitCreateDialog = (payload) => {
    console.log(payload)
    this.closeCreateDialog()
  }

  render () {
    const { inode, currentFile, renameDialogOpen, renameDialogCurrentName, createDialogOpen, createDialogType } = this.state
    const { classes, match } = this.props

    return (
      <section>
        <CssBaseline />
        <Header match={match} />
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item md={3}>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h5'> Tamanho de Disco </Typography>
                <Typography className={classes.statDescription} variant='body2'> 120 MB </Typography>
              </Paper>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h5'> Tamanho de Bloco </Typography>
                <Typography className={classes.statDescription} variant='body2'> 2 KB </Typography>
              </Paper>
              <Paper elevation={24} className={classes.paper}>
                <Typography variant='h5'> Quantidade de Blocos </Typography>
                <Typography className={classes.statDescription} variant='body2'> 600 blocos </Typography>
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
                <div className={classes.fileTitle}>
                  <Typography variant='h4'> {currentFile.title} </Typography>
                  <Typography variant='overline'> <strong> {currentFile.size} </strong> bytes. </Typography>
                </div>
                <Divider variant='middle' className={classes.divider} />
                <Typography variant='body2'> {currentFile.content} </Typography>
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
