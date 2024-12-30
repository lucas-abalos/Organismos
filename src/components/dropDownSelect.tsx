import React from 'react';
import { MenuItem, Select, SelectChangeEvent, FormControl } from '@mui/material';
import { styled } from '@mui/system';

// Estilos personalizados para el Select
const StyledFormControl = styled(FormControl)({
  maxWidth: 100,
  '& .MuiOutlinedInput-root': {
    borderRadius: 8,       // Borde redondeado
    borderColor: '#D3D3D3', // Color de borde gris claro
  },
  '& .MuiSelect-select': {
    color: '#A9A9A9',       // Color de texto gris
    padding: '10px 14px',   // Espaciado interno para el texto
  },
  '& .MuiSvgIcon-root': {
    color: 'black',         // Color de la flecha desplegable
  },
});

// Tipos de las props del componente
interface DropdownProps {
  options: { value: string; label: string }[]; // Lista de opciones { valor, etiqueta }
  value: string;
  placeholder?: string;                         // Placeholder opcional
  onChange?: (value: string) => void;           // Función para manejar cambios
}

const DropDownSelect: React.FC<DropdownProps> = ({ options, placeholder = "Seleccione...", onChange }) => {
  const [selectedValue, setSelectedValue] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    setSelectedValue(value);
    if (onChange) {
      onChange(value); // Llamar a la función de cambio si existe
    }
  };

  return (
    <StyledFormControl variant="outlined">
      <Select
        value={selectedValue}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <span style={{ color: '#A9A9A9' }}>{placeholder}</span>;
          }
          return selected;
        }}
      >
        {options.length === 0 && (
          <MenuItem disabled value="">
            <span style={{ color: '#A9A9A9' }}>{placeholder}</span>
          </MenuItem>
        )}
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </StyledFormControl>
  );
};

export default DropDownSelect;
