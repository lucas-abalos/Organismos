import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface NotamsItem {
  NUMERO: string;
  DT_REP: string;
  ID_AREA: string;
  TEXTO: string;
  DT_FROM: string;
  DT_TO: string;
  ESTADO: string;
}

const NoTAMSTableRow: React.FC<{ item: NotamsItem }> = ({ item }) => {
  return (
    <TableContainer component={Paper} style={{ borderRadius: 8, overflow: "hidden", marginBottom: "16px" }}>
      <Table>
        <TableHead>
          <TableRow>
            {["Número", "Publicación", "Área", "Texto", "Desde", "Hasta", "Estado"].map((title, index) => (
              <TableCell
                key={index}
                align="center"
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#007381",
                  fontSize: "16px",
                  fontWeight: 400,
                  borderLeft: index == 0 ? "15px solid #FFFFFF" : "none",
                  borderTop: "15px solid #FFFFFF",
                  borderBottom: "1px solid #FFFFFF",
                  borderRight: "15px solid #FFFFFF",
                  padding: "10px 16px",
                }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {[
              item.NUMERO,
              item.DT_REP,
              item.ID_AREA,
              item.TEXTO,
              item.DT_FROM,
              item.DT_TO,
              item.ESTADO,
            ].map((value, colIndex) => (
              <TableCell
                key={colIndex}
                align="center"
                style={{
                  fontSize: "14px",
                  borderRight: "15px solid #FFFFFF",
                  padding: "10px 16px",
                }}
              >
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NoTAMSTableRow;
