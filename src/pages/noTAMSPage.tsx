import React, { useState, useMemo } from 'react';
import { Box, Divider, GlobalStyles, Typography } from '@mui/material';
import LogoAeropuertos from '../logos/LogoAeropuertos.svg';
import LogoTams from '../logos/LogoTams.svg';
import HeaderNoTAMS from '../components/headerNoTAMS';
import { fetchNOTAMS } from '../redux/dataSlice';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import NoTAMSTableRow from '../components/noTAMSTableRow';
import { useNavigate } from 'react-router-dom';

const NoTamsScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchBarValue, setSearchBarValue] = useState('');

  const handleSearchBarChange = (value: string) => {
    setSearchBarValue(value);
  };

  const handleReturnOrganismosClick = () => {
    navigate('/organismos'); 
  };

  const selectedAirport = useSelector((state: RootState) => state.data.selectedAirport);
  const clickPermanentes = useSelector((state: RootState) => state.data.clickPermanentes);
  const clickVigentes = useSelector((state: RootState) => state.data.clickVigentes);
  const clickVencidos = useSelector((state: RootState) => state.data.clickVencidos);

  // Despachar fetchDatosGrilla cuando el componente se monta
  useEffect(() => {
      dispatch(fetchNOTAMS({ 
        id_arpt: selectedAirport,
        fecha: 'TODOS', // YA NO SE USA EL selectedFechaNoTAMS. No se filtra por fecha
      })); 
  }, [dispatch]); // Solo se ejecuta cuando isSearchExecuted cambia
  const datosNOTAMS = useSelector((state: RootState) => state.data.datosNOTAMS);

  // Filtra los datos de acuerdo al valor del search bar
  const filteredDatosNOTAMS = useMemo(() => {
    let filtered = datosNOTAMS;

    // Filtrar por estado según las variables de click
    filtered = filtered.filter(item => {
      const estado = item.ESTADO; 
      if (!clickPermanentes && estado === 'Permanente') return false;
      if (!clickVigentes && estado === 'Vigente') return false;
      if (!clickVencidos && estado === 'Vencido') return false;
      return true;
    });

    // Filtrar por valor del buscador
    if (searchBarValue.trim()) {
      const lowerCaseValue = searchBarValue.toLowerCase();
      filtered = filtered.filter(item =>
        Object.values(item).some(val =>
          val && val.toString().toLowerCase().includes(lowerCaseValue)
        )
      );
    }

    return filtered;
  }, [datosNOTAMS, clickPermanentes, clickVigentes, clickVencidos, searchBarValue]); // Lo que está en corchetes al final son las dependencias. Esto es para garantizar que se recalcule la lógica del filtro cuando alguno de los valores cambie.

  return (
    <><GlobalStyles
      styles={{
        body: { margin: 0, padding: 0, backgroundColor: '#EEEEEE' },
        html: { height: '100%', backgroundColor: '#EEEEEE' },
      }} /><Box sx={{ width: '100%', minheight: '100vh', padding: '20px', textAlign: 'center', backgroundColor: '#EEEEEE' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
          <img src={LogoAeropuertos} alt="Logo Aeropuertos" style={{ height: '65px' }} />
          <img src={LogoTams} alt="Logo Tams" style={{ height: '40px', marginTop: '10px' }} />
        </Box>

        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontSize: 30,
            font: 'Roboto',
            marginBottom: '16px',
            color: '#00A395',
            textAlign: 'left',
            marginLeft: '0px',
            display: 'flex', 
            gap: '5px', 
          }}
        >
          <span
            onClick={handleReturnOrganismosClick}
            style={{
              cursor: 'pointer',
              textDecoration: 'none', 
              color: '#00A395', 
              fontWeight: 300,
              transition: 'color 0.2s ease, font-weight 0.2s ease', // Suaviza el cambio de estilo
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.fontWeight = '500'; 
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.fontWeight = '300'; 
            }}
          >
            Organismos
          </span>

          <span style={{ color: '#00A395', fontWeight: 300 }}>
            / Notams
          </span>
      </Typography>

      <Divider sx={{ backgroundColor: '#ccc', marginBottom: '20px' }} />

      <HeaderNoTAMS sx={{ marginBottom: '24px' }} onSearchBarChange={handleSearchBarChange} />

      {(
          filteredDatosNOTAMS.length > 0 ? (
            filteredDatosNOTAMS.map((item, index) => (
              <NoTAMSTableRow key={index} item={item} />
            ))
          ) : (
            <Typography variant="body1" sx={{ color: '#888', fontStyle: 'italic' }}>
              No se encontraron resultados.
            </Typography>
          )
        )}
    </Box></>
  );
};

export default NoTamsScreen;
