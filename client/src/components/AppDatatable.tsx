import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@mui/material';

interface DataTableProps<T> {
  columns: { label: string }[];
  rows: T[];
  renderCell: (row: T, column: string) => React.ReactNode;
}

export default function AppDataTable<T>({ columns, rows, renderCell }: DataTableProps<T>) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="customizable table">
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index} align='left'>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex} align='left'>
                  {renderCell(row, column.label)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}