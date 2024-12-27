import React, { useState } from 'react';
import { Box, Divider, Typography, GlobalStyles } from '@mui/material';
import HeaderOrganismos from '../components/headerOrganismos';
import VuelosTablePartidas from '../components/vuelosTablePartidas';
import VuelosTableArribos from '../components/vuelosTableArribos';
import LogoAeropuertos from '../logos/LogoAeropuertos.svg';
import LogoTams from '../logos/LogoTams.svg';
import LogoGrillaVacia from '../logos/LogoGrillaVacia.svg';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { fetchVuelos } from '../redux/dataSlice';

const OrganismosScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showTable, setShowTable] = useState(false);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false); // Flag para controlar la ejecución
  const [movSeleccionado, setmovSeleccionado] = useState<String>(''); // Flag para controlar el movimiento seleccionado al apretar Buscar

  const handleSearch = () => {
    setIsSearchExecuted(true);
    setShowTable(true);
  };

  const selectedAirport = useSelector((state: RootState) => state.data.selectedAirport);
  const selectedAirline = useSelector((state: RootState) => state.data.selectedAirline);
  const selectedTerminal = useSelector((state: RootState) => state.data.selectedTerminal);
  const selectedFechaDesde = useSelector((state: RootState) => state.data.selectedFechaDesde);
  const selectedEstVuelo = 'TODOS';
  const selectedTipoVuelo = useSelector((state: RootState) => state.data.selectedTipoVuelo);

  // Despachar fetchDatosGrilla cuando el componente se monta
  useEffect(() => {
    if(isSearchExecuted){ 
      dispatch(fetchVuelos({ 
        id_arpt: selectedAirport,
        id_airline: selectedAirline, 
        sector: selectedTerminal,   
        tiempo_antes: selectedFechaDesde,        
        est_vuelos: selectedEstVuelo,           
        movtp: selectedTipoVuelo,  
      })); 
      // Restablecer el flag a false después de ejecutar la búsqueda
      setIsSearchExecuted(false);
      setmovSeleccionado(selectedTipoVuelo);
    }
  }, [dispatch, isSearchExecuted]); // Solo se ejecuta cuando isSearchExecuted cambia
  const datosGrilla = useSelector((state: RootState) => state.data.datosGrilla);



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
          }}
        >
          Organismos
        </Typography>

        <Divider sx={{ backgroundColor: '#ccc', marginBottom: '20px' }} />

        {/* Pasamos handleSearch como prop */}
        <HeaderOrganismos sx={{ marginBottom: '24px' }} onSearch={handleSearch} />

        {showTable ? (
          movSeleccionado === 'A' ? (
            <VuelosTableArribos items={datosGrilla} />
          ) : (
            <VuelosTablePartidas items={datosGrilla} />
          )
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <img src={LogoGrillaVacia} alt="Logo Grilla Vacía" style={{ height: '400px', marginBottom: '16px' }} />
            <Typography
              variant="body1"
              sx={{
                font: 'Roboto',
                color: '#0A0A0B',
                fontWeight: '600',
              }}
            >
              Utilizá los filtros para refinar tu búsqueda y obtener resultados precisos.
            </Typography>
          </Box>
        )}
      </Box></>
  );
};

export default OrganismosScreen;
