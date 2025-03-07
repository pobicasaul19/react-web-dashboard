import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material'

interface DataTableProps<T> {
  columns: { label: string; align?: 'right' | 'left' | 'center' }[];
  rows: T[];
  renderCell: (row: T, columnIndex: number) => React.ReactNode;
}

export default function DataTable<T>({ columns, rows, renderCell }: DataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customizable table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align={column.align || 'left'}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((_, columnIndex) => (
                <TableCell key={columnIndex} align={columns[columnIndex].align || 'left'}>
                  {renderCell(row, columnIndex)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
