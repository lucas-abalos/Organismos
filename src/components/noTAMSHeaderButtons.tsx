import React, { useState } from 'react';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = styled(Button)<{ active: boolean }>(({ active }) => ({
  backgroundColor: active ? '#EEEEEE' : '#2C8C95', // Fondo blanco si está activo, azul si no
  color: active ? '#2C8C95' : '#EEEEEE',           // Texto azul si está activo, blanco si no
  fontWeight: 'bold',                           // Texto en negrita
  padding: '5px 20px',
  textTransform: 'none',                        // Mantener texto sin transformación
  borderRadius: 25,
  border: `2px solid ${active ? '#2C8C95' : 'transparent'}`, // Borde visible si está activo
  '&:hover': {
    backgroundColor: active ? '#B3C7C6' : '#216E73',         // Ligero cambio de color al hover
  },
}));

interface ButtonProps {
  onClick?: () => void;
  label: string; 
  clickeado?: boolean;
}

const NOTamsHeaderButton: React.FC<ButtonProps> = ({ onClick, label, clickeado = true }) => {
  const [active, setActive] = useState(!clickeado); // Estado local para el botón

  const handleClick = () => {
    setActive(!active); // Cambiar el estado activo al hacer clic
    if (onClick) onClick();
  };

  return (
    <StyledButton active={active} onClick={handleClick}>
      {label}
    </StyledButton>
  );
};

export default NOTamsHeaderButton;
