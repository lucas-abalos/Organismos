import React from 'react';
import { Box, SxProps, Typography } from '@mui/material';
import DropDownSelect from "../components/dropDownSelect";
import NoTAMSButton from "../components/noTAMSButton";
import SearchButton from "../components/searchButton";
import ArrivalDepartureButton from "../components/arrivalDepartureButton";
import HourSlider from "../components/hourSliderOneSide";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";
import { fetchAeropuertos, fetchAerolineas, fetchTerminales, setSelectedAirport, setSelectedAirline, setSelectedTerminal } from "../redux/dataSlice";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface HeaderOrganismosProps {
  onSearch: () => void; 
  sx?: SxProps;
}

const HeaderOrganismos: React.FC<HeaderOrganismosProps>  = ({ onSearch, sx }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleNotamsButtonClick = () => {
    navigate('/notams'); 
  };
  // Obtener la lista de aeropuertos del estado
  const aeropuertoOptions = useSelector((state: RootState) => 
    state.data.aeropuertos.map((aeropuerto) => ({
      value: aeropuerto.Value, 
      label: aeropuerto.Key, 
    }))
  );

  // Despachar fetchAeropuertos cuando el componente se monta
  useEffect(() => {
    dispatch(fetchAeropuertos()); 
  }, [dispatch]);

  // Obtener aeropuerto seleccionado del estado
  const selectedAirport = useSelector((state: RootState) => state.data.selectedAirport);
  const selectedAirline = useSelector((state: RootState) => state.data.selectedAirline);
  const selectedTerminal = useSelector((state: RootState) => state.data.selectedTerminal);

  // Manejar cambio de selección de aeropuerto
  const handleAirportChange = (value: string) => {
    dispatch(setSelectedAirport(value)); // Actualiza el aeropuerto seleccionado en el estado global
    dispatch(fetchTerminales({ id_arpt: value })); // Actualiza las terminales en función del aeropuerto
    dispatch(fetchAerolineas({ id_arpt: value }));
    console.log("Aeropuerto seleccionado:", value);
  };
  const handleAirlineChange = (value: string) => {
    dispatch(setSelectedAirline(value));
    console.log("Aerolinea seleccionado:", value);
  };
  const handleTerminalChange = (value: string) => {
    dispatch(setSelectedTerminal(value)); 
    console.log("Terminal seleccionado:", value);
  };

  // Obtener la lista de aeropuertos del estado 
  const aerolineaOptions = useSelector((state: RootState) => 
    state.data.aerolineas.map((aerolineas) => ({
      value: aerolineas.Value, 
      label: aerolineas.Key, 
    }))
  );

  // Despachar fetchAerolineas cuando el componente se monta
  useEffect(() => {
    dispatch(fetchAerolineas({ id_arpt: selectedAirport }));
  }, [dispatch]);


  // Obtener la lista de aeropuertos del estado
  const terminalOptions = useSelector((state: RootState) => 
    state.data.terminales.map((terminales) => ({
      value: terminales.Value, 
      label: terminales.Key, 
    }))
  );

  // Despachar fetchTerminales cuando el componente se monta
  useEffect(() => {
    dispatch(fetchTerminales({ id_arpt: selectedAirport }));
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        padding: '16px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        gap: '16px', 
        ...sx,
      }}
    >
      <Typography variant="body2" sx={{ fontFamily: 'Roboto !important', fontSize: '16px !important' }}>
        Aeropuerto
      </Typography>
      <DropDownSelect
        options={aeropuertoOptions}
        placeholder="Seleccione..."
        onChange={handleAirportChange}
        value={selectedAirport || ''}
      />

      <Typography variant="body2" sx={{ fontFamily: 'Roboto !important', fontSize: '16px !important'}}>Aerolínea</Typography>
      <DropDownSelect
        options={aerolineaOptions}
        placeholder="Seleccione..."
        onChange={handleAirlineChange}
        value={selectedAirline || ''}
      />

      <Typography variant="body2" sx={{ fontFamily: 'Roboto !important', fontSize: '16px !important'}}>Terminal</Typography>
      <DropDownSelect
        options={terminalOptions}
        placeholder="Seleccione..."
        onChange={handleTerminalChange}
        value={selectedTerminal || ''}
      />

      <ArrivalDepartureButton />

      <Typography variant="body2" sx={{ fontFamily: 'Roboto !important', fontSize: '16px !important'}}>Horas</Typography>
      <HourSlider />

      <SearchButton onClick={onSearch} />

      <NoTAMSButton disabled = {!selectedAirport} onClick={handleNotamsButtonClick}/>
    </Box>
  );
};

export default HeaderOrganismos;

