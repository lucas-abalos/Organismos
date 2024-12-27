import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const columns = [
  { label: 'Aerolínea', key: 'AEROLINEA' },
  { label: 'Vuelo', key: 'FLIGHT' },
  { label: 'Matrícula', key: 'ID_REG' },
  { label: 'Origen', key: 'ID_ARPT_DEST_ORIG' },
  { label: 'STA', key: 'DT_STDA' },
  { label: 'ETA', key: 'DT_ETDA' },
  { label: 'ATA', key: 'DT_ATDA' },
  { label: 'Remark', key: 'ID_REMARK' },
  { label: 'Terminal', key: 'TERMINAL' },
  { label: 'Sector', key: 'SECTOR' },
  { label: 'Cinta', key: 'BELT' },
  { label: 'L&F', key: 'CHK_LYF' },
  { label: 'Pasajeros', key: 'SAP_PAX' },
  // { label: 'Organismos', key: 'organismos' },
];

const VuelosTable: React.FC<{ items: any[] }> = ({ items }) => {
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

  const formatDate = (dateString: string) => {
    if (!dateString) return ''; // Si la fecha es null o vacía, devuelve una cadena vacía

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';

    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0'); 
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  const handleSort = (column: string) => {
    if (orderBy === column) {
      // Cambiar el orden si ya está seleccionado
      setOrderDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      // Seleccionar una nueva columna
      setOrderBy(column);
      setOrderDirection('asc');
    }
  };

  const sortedItems = React.useMemo(() => {
    if (!orderBy) return items;

    return [...items].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) return orderDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return orderDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [items, orderBy, orderDirection]);

  const titleStyle: React.CSSProperties = {
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontWeight: 300,
    textAlign: 'center',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const cellStyle: React.CSSProperties = {
    textAlign: 'center', 
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
        <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key} style={{ textAlign: 'center' }}>
                <div style={titleStyle} onClick={() => handleSort(column.key)}>
                  {column.label}
                  {orderBy === column.key ? (
                    orderDirection === 'asc' ? (
                      <ArrowDropUpIcon fontSize="small" />
                    ) : (
                      <ArrowDropDownIcon fontSize="small" />
                    )
                  ) : (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                </div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedItems.map((vuelo) => (
            <TableRow key={vuelo.id}>
              <TableCell style={cellStyle}>{vuelo.AEROLINEA}</TableCell>
              <TableCell style={cellStyle}>{vuelo.FLIGHT}</TableCell>
              <TableCell style={cellStyle}>{vuelo.ID_REG}</TableCell>
              <TableCell style={cellStyle}>{vuelo.ID_ARPT_DEST_ORIG}</TableCell>
              <TableCell style={cellStyle}>{formatDate(vuelo.DT_STDA)}</TableCell>
              <TableCell style={cellStyle}>{formatDate(vuelo.DT_ETDA)}</TableCell>
              <TableCell style={cellStyle}>{formatDate(vuelo.DT_ATDA)}</TableCell>
              <TableCell style={cellStyle}>{vuelo.ID_REMARK}</TableCell>
              <TableCell style={cellStyle}>{vuelo.TERMINAL}</TableCell>
              <TableCell style={cellStyle}>{vuelo.SECTOR}</TableCell>
              <TableCell style={cellStyle}>{vuelo.BELT}</TableCell>
              <TableCell style={cellStyle}>{vuelo.CHK_LYF}</TableCell>
              <TableCell style={cellStyle}>{vuelo.SAP_PAX}</TableCell>
              {/* <TableCell style={cellStyle}>
                {vuelo.organismos ? (
                  <IconButton color="success">
                    <CheckIcon />
                  </IconButton>
                ) : (
                  <IconButton color="error">
                    <CloseIcon />
                  </IconButton>
                )}
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VuelosTable;
