import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

class CreateDialog extends React.Component {
  state = { name: '', content: '' }

  nameChange = (e) => {
    const { value } = e.target
    this.setState({ name: value })
  }

  contentChange = (e) => {
    const { value } = e.target
    this.setState({ content: value })
  }

  submitCaller = () => {
    const { handleSubmit, type } = this.props
    const { name, content } = this.state
    const payload = { name }

    if (type === 'file') {
      payload['content'] = content
    }

    handleSubmit(payload)
  }

  handleKeyPress = (ev) => {
    if (ev.key === 'Enter') {
      ev.preventDefault()
      this.submitCaller()
    }
  }

  render () {
    const { open, handleClose, type } = this.props
    const typeText = (type === 'file') ? 'Arquivo' : 'Diretório'

    const contentInput = (type === 'file') ? <TextField multiline margin='dense' id='content' label='Conteúdo' type='textarea' fullWidth onChange={this.contentChange} onKeyPress={this.handleKeyPress} /> : null

    return (
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby='renameDialogTitle'>
          <DialogTitle id='renameDialogTitle'>Criar {typeText}</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin='dense' id='name' label='Nome' type='text' fullWidth onChange={this.nameChange} onKeyPress={this.handleKeyPress} />
            {contentInput}
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
CreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(['file', 'folder'])
}

export default CreateDialog
