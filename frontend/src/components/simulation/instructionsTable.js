import React from 'react'
// import PropTypes from 'prop-types'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class InstructionsTable extends React.Component {
  render () {
    function createData (operation, instruction, example) {
      return { operation, instruction, example }
    }

    const rows = [
      createData('Ver Diretório de Trabalho', 'pwd', 'pwd'),
      createData('Mudar Diretório de Trabalho', 'cd DIRETORIO', 'cd /home/arquivos'),
      createData('Criar Arquivo', 'touch FILENAME', 'touch arquivo.txt'),
      createData('Remover Arquivo', 'rm FILENAME', 'rm arquivo.txt'),
      createData('Criar Diretório', 'mkdir DIRECTORY', 'mkdir novaPasta'),
      createData('Remover Diretório', 'rmdir DIRECTORY', 'rmdir novaPasta')
    ]

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Operação</TableCell>
            <TableCell>Instrução</TableCell>
            <TableCell>Exemplo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.operation}>
              <TableCell component='th' scope='row'> {row.operation}</TableCell>
              <TableCell>{row.instruction}</TableCell>
              <TableCell>{row.example}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
}

export default InstructionsTable
