import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const BasicFooter = (props) => {
  return (
    <footer>
      <Typography variant='body2' color='textSecondary' align='center'> Sistemas Operacionais - Ciência da Computação </Typography>
      <Typography variant='caption' display='block' gutterBottom color='textSecondary' align='center'> Bruno Marra, Gustavo Viegas, Heitor Passeado </Typography>
      <Divider variant='middle' />
      <Typography variant='body2' color='textSecondary' align='center'> Universidade Federal de Viçosa, Campus Florestal </Typography>
    </footer>
  )
}

export default BasicFooter
