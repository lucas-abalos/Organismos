import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { styled } from '@mui/system';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../redux/store";
import { setSelectedTipoVuelo } from "../redux/dataSlice";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  overflow: 'hidden',
});

const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp: (prop) => prop !== 'isArribos',
})<{ isArribos?: boolean; selected?: boolean }>(({ theme, isArribos, selected }) => ({
  flex: 1,
  maxWidth: 100,
  minWidth: 50,
  fontSize: '16px', 
  '@media (max-width: 1300px)': {
    fontSize: '10px',
  },
  fontWeight: 'bold',
  padding: '10px 20px',
  borderRadius: '5px',
  border: `2px solid ${isArribos ? '#1976d2' : '#4CAF50'}`, // Borde azul para Arribos, verde para Partidas
  borderColor: isArribos ? '#1976d2' : '#4CAF50', // Se muestra solo en el seleccionado
  '&.Mui-selected': {
    color: '#fff',
    backgroundColor: isArribos ? '#1976d2' : '#4CAF50', // Azul para Arribos y verde para Partidas cuando está seleccionado
    pointerEvents: 'none', // Desactiva el hover para el elemento seleccionado
  },
  '&:not(.Mui-selected)': {
    color: isArribos ? '#1976d2' : '#4CAF50',
    backgroundColor: '#fff', // Fondo blanco cuando no está seleccionado
  },
  '&:not(.Mui-selected):hover': {
    backgroundColor: isArribos ? '#E3F2FD' : '#E8F5E9', // Fondo más claro en hover solo para los no seleccionados
    borderColor: isArribos ? '#1565c0' : '#388E3C', // Borde más oscuro en hover solo para los no seleccionados
  },
}));

const FilterButtons: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<string>('arribos');

  const handleToggle = (event: React.MouseEvent<HTMLElement>, newSelection: string | null) => {
    if (newSelection !== null) {
      setSelected(newSelection);
      const tipoVuelo = newSelection === 'arribos' ? 'A' : 'D';
      dispatch(setSelectedTipoVuelo(tipoVuelo)); 
    }
  };

  return (
    <StyledToggleButtonGroup value={selected} exclusive onChange={handleToggle}>
      <StyledToggleButton value="arribos" selected={selected === 'arribos'} isArribos={true}>
        Arribos
      </StyledToggleButton>
      <StyledToggleButton value="partidas" selected={selected === 'partidas'} isArribos={false}>
        Partidas
      </StyledToggleButton>
    </StyledToggleButtonGroup>
  );
};

export default FilterButtons;
