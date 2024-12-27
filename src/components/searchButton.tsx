import React from 'react';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/system';

const StyledButton = styled(Button)({
  backgroundColor: '#1976d2', // Color de fondo azul
  color: '#fff',               // Color de texto blanco
  fontWeight: 'bold',          // Texto en negrita
  padding: '10px 20px',
  textTransform: 'none',       // Mantener texto sin transformación
  borderRadius: 8,             // Borde redondeado
  '&:hover': {
    backgroundColor: '#155fa0', // Azul más oscuro en hover
  },
});

interface SearchButtonProps {
  onClick?: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onClick }) => {
  return (
    <StyledButton onClick={onClick} startIcon={<SearchIcon />}>
      Buscar
    </StyledButton>
  );
};

export default SearchButton;
