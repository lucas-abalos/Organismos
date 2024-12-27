import React, { useState } from 'react';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';

const IconBluePrinter: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '48px',
        height: '48px',
        backgroundColor: isHovered ? '#005F8D' : '#007ACE', // Cambio de color en hover
        borderRadius: '8px',
        color: '#FFFFFF',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Efecto de agrandamiento
      }}
      onMouseEnter={() => setIsHovered(true)}  // Activar hover
      onMouseLeave={() => setIsHovered(false)} // Desactivar hover
    >
      <LocalPrintshopOutlinedIcon style={{ fontSize: '24px' }} />
    </div>
  );
};

export default IconBluePrinter;
