import React from 'react'
import Typography from '@material-ui/core/Typography'

const BasicFooter = (props) => {
  return (
    <footer>
      <Typography variant='body2' color='textSecondary' align='center'> Sistemas Operacionais - Ciência da Computação </Typography>
      <hr />
      <Typography variant='body2' color='textSecondary' align='center'> Universidade Federal de Viçosa, Campus Florestal </Typography>
    </footer>
  )
}

export default BasicFooter
