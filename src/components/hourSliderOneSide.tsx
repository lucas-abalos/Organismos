import { Slider } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from "../redux/store";
import { setSelectedFechaDesde } from "../redux/dataSlice";

// Valores personalizados para el slider, con los incrementos como mencionaste
const sliderValues = ['-48', '-24', '-12', '-6', '-5', '-4', '-3', '-2', '-1', '0', '1', '2', '3', '4', '5', '6', '12', '24', '48'];

// Componente estilizado para el Slider
const CustomSlider = styled(Slider)({
  color: '#009688',
  width: '200px',
  height: '12px',
  '& .MuiSlider-thumb': {
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#fff',
    color: '#009688',
    fontSize: 12,
    top: -5,
  },
  '& .MuiSlider-track': {
    height: 8,
  },
  '& .MuiSlider-rail': {
    height: 8,
    color: '#bfbfbf',
  },
  '& .MuiSlider-markLabel': {
    fontSize: 12,  
    fontWeight: 500,  
  },
});

const HourRangeSlider: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // Establece el rango inicial en los extremos de -6hs y +6hs
  const [range, setRange] = useState<number[]>([
    sliderValues.indexOf('0'),
    sliderValues.indexOf('6'),
  ]);

  // Manejador de cambio para el rango
  const handleRangeChange = (_event: Event, newValue: number | number[]) => {
    let desde = '6';
    if (Array.isArray(newValue)) {
      if(newValue[0] < 9){
        newValue[1] = 9;
        desde = sliderValues[newValue[0]];
      }
      else{
        newValue[0] = 9;
        desde = sliderValues[newValue[1]];
      }
      setRange(newValue);
      dispatch(setSelectedFechaDesde(desde)); 
    }
  };

  return (
    <CustomSlider
      value={range}
      onChange={handleRangeChange}
      min={0}
      max={sliderValues.length - 1}
      step={1}
      marks={[
        { value: sliderValues.indexOf('-48'), label: '-48hs' },
        { value: sliderValues.indexOf('-6'), label: '-6hs' },
        { value: sliderValues.indexOf('0'), label: '0hs' },
        { value: sliderValues.indexOf('6'), label: '+6hs' },
        { value: sliderValues.indexOf('48'), label: '+48hs' },
      ]}
      valueLabelDisplay="on"
      valueLabelFormat={(index) => {
        // Etiqueta visible para el valor actual, ocultando los límites
        const value = sliderValues[index];
        return value === '0' ? '0' : `${value}hs`;
      }}
    />
  );
};

export default HourRangeSlider;
