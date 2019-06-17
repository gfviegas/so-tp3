import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

class RenameDialog extends React.Component {
  constructor (props) {
    super(props)

    const { currentName } = this.props
    this.state = { currentName }
  }

  currentNameChange = (e) => {
    const { value } = e.target
    this.setState({ currentName: value })
  }

  submitCaller = () => {
    const { handleSubmit } = this.props
    const { currentName } = this.state

    handleSubmit(currentName)
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      this.submitCaller()
    }
  }

  render () {
    const { open, handleClose, currentName } = this.props

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby='renameDialogTitle'>
          <DialogTitle id='renameDialogTitle'>Renomear Item</DialogTitle>
          <DialogContent>
            <DialogContentText> Escreva o novo nome do arquivo ou diretório selecionado. </DialogContentText>
            <TextField autoFocus margin='dense' id='name' label='Nome' type='text' defaultValue={currentName} fullWidth onChange={this.currentNameChange} onKeyPress={this.handleKeyPress} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color='primary'> Cancelar </Button>
            <Button onClick={this.submitCaller} color='primary'> Salvar </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
RenameDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  currentName: PropTypes.string
}

export default RenameDialog
