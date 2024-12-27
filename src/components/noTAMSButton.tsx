import React from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledNotamsButton = styled(Button)({
  backgroundColor: '#A5D6A7', // Color de fondo verde claro
  color: '#1976d2',           // Color de texto azul
  fontWeight: 'bold',         // Texto en negrita
  padding: '10px 20px',
  textTransform: 'none',      // Mantener el texto sin transformación
  borderRadius: 8,            // Borde redondeado
  '&:hover': {
    backgroundColor: '#81c784', // Verde más oscuro en hover
  },
});

interface NotamsButtonProps {
  onClick?: () => void;
  disabled?: boolean;
}

const NotamsButton: React.FC<NotamsButtonProps> = ({ onClick, disabled }) => {
  return (
    <StyledNotamsButton onClick={onClick} disabled = {disabled}>
      NOTAMS
    </StyledNotamsButton>
  );
};

export default NotamsButton;
