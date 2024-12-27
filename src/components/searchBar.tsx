import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      onChange={handleChange}
      placeholder="#Palabra clave/ Número de Publicación"
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: '#9E9E9E' }} /> 
          </InputAdornment>
        ),
      }}
      sx={{
        width: '320px',
        backgroundColor: '#F9F9F9', 
        borderRadius: '25px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px',
          paddingRight: '8px',
          '& fieldset': {
            borderColor: '#E0E0E0', 
          },
          '&:hover fieldset': {
            borderColor: '#BDBDBD', 
          },
          '&.Mui-focused fieldset': {
            borderColor: '#9E9E9E', 
          },
        },
        '& input': {
          fontSize: '14px', 
          color: '#616161', 
        },
      }}
    />
  );
};

export default SearchBar;
