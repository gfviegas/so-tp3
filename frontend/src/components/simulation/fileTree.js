import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import ListSubheader from '@material-ui/core/ListSubheader'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FileIcon from '@material-ui/icons/DescriptionOutlined'
import FolderIcon from '@material-ui/icons/Folder'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  paddedList: {
    paddingLeft: theme.spacing(4)
  }
})

class FileTree extends React.Component {
  state = { activeItem: null, anchorEl: null }
  options = ['Abrir', 'Renomear', 'Excluir']

  handleClickListItem = (event, activeItem) => {
    console.log(activeItem)
    this.setState({ anchorEl: event.currentTarget, activeItem })
  }

  handleMenuItemClick = (event, index) => {
    const { activeItem } = this.state
    const { onItemOpen, onItemDelete, onItemRename } = this.props

    switch (index) {
      case 0:
        onItemOpen(activeItem)
        break
      case 1:
        onItemRename(activeItem)
        break
      case 2:
        onItemDelete(activeItem)
        break
    }

    this.setState({ anchorEl: null, activeItem: null })
  }

  handleClose = () => {
    this.setState({ anchorEl: null, activeItem: null })
  }

  renderItems = () => {
    const { items } = this.props.inode

    return items.map(i => {
      const icon = (i.type === 'folder') ? <FolderIcon /> : <FileIcon />

      return (
        <ListItem button key={i.title} selected={i.open} onClick={(e) => this.handleClickListItem(e, i)}>
          <ListItemIcon>
            {icon}
          </ListItemIcon>
          <ListItemText primary={i.title} />
        </ListItem>
      )
    })
  }

  render () {
    const { classes, inode } = this.props
    const { anchorEl } = this.state
    const { wd } = inode

    return (
      <section className={classes.root}>
        <List
          component='nav'
          aria-labelledby='nested-list-subheader'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader'>
              Diretório atual: {wd}
            </ListSubheader>
          }
          className={classes.root}
        >
          <ListItem button key={'root'} disabled>
            <ListItemIcon>
              <FolderOpenIcon />
            </ListItemIcon>
            <ListItemText primary={wd} />
          </ListItem>
          <Collapse in unmountOnExit>
            <List component='div' disablePadding className={classes.paddedList}>
              <ListItem button key={'parent'}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText primary='..' />
              </ListItem>
              {this.renderItems()}
            </List>
          </Collapse>
        </List>

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.options.map((option, index) => (
            <MenuItem
              key={option}
              onClick={e => this.handleMenuItemClick(e, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </section>
    )
  }
}
FileTree.propTypes = {
  classes: PropTypes.object.isRequired,
  inode: PropTypes.object.isRequired,
  onItemOpen: PropTypes.func.isRequired,
  onItemDelete: PropTypes.func.isRequired,
  onItemRename: PropTypes.func.isRequired
}

export default withStyles(styles, { withTheme: true })(FileTree)
