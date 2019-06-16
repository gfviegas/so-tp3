import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import ListSubheader from '@material-ui/core/ListSubheader'
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
  state = { open: false }

  handleClick = () => {
    this.setState({ open: !this.state.open })
  }

  renderItems = () => {
    const { items } = this.props.inode

    return items.map(i => {
      const icon = (i.type === 'folder') ? <FolderIcon /> : <FileIcon />

      return (
        <ListItem button key={i.title}>
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
    const { wd } = inode

    return (
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
    )
  }
}
FileTree.propTypes = {
  classes: PropTypes.object.isRequired,
  inode: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(FileTree)
