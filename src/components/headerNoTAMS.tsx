import React from 'react';
import { Box, SxProps } from '@mui/material';
import SearchBar from '../components/searchBar';
import NoTAMSHeaderButtons from './noTAMSHeaderButtons';
import { setClickPermanentes, setClickVigentes, setClickVencidos } from "../redux/dataSlice";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../redux/store";


interface HeaderNoTAMSProps {
  sx?: SxProps;
  onSearchBarChange: (value: string) => void;
}

const Header: React.FC<HeaderNoTAMSProps> = ({ sx, onSearchBarChange}) => {
  const dispatch = useDispatch<AppDispatch>();

  const clickPermanentes = useSelector((state: RootState) => state.data.clickPermanentes);
  const clickVigentes = useSelector((state: RootState) => state.data.clickVigentes);
  const clickVencidos = useSelector((state: RootState) => state.data.clickVencidos);

  const onClickVigentes = () => {
    dispatch(setClickVigentes(!clickVigentes)); 
  };

  const onClickPermanentes = () => {
    dispatch(setClickPermanentes(!clickPermanentes)); 
  };

  const onClickVencidos = () => {
    dispatch(setClickVencidos(!clickVencidos)); 
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'start', // Centrar los botones horizontalmente
        alignItems: 'center',
        gap: 1, // Espaciado entre botones
        ...sx, // Aplica estilos pasados por props
      }}
    >
       <div style={{ marginRight: 200 }}>
         <SearchBar onChange={onSearchBarChange}/>
       </div>
      <NoTAMSHeaderButtons label="Vigentes" onClick={onClickVigentes} clickeado={true} />
      <NoTAMSHeaderButtons label="Permanentes" onClick={onClickPermanentes} clickeado={true} />
      <NoTAMSHeaderButtons label="Vencidos" onClick={onClickVencidos} clickeado={false} />
    </Box>
  );
};

export default Header;
