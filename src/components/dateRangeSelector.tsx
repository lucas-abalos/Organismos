import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; 

dayjs.locale('es'); 


interface DateRangeSelectorProps {
  onChange: (startDate: Dayjs | null, endDate: Dayjs | null) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({onChange}) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleStartDateChange = (newValue: Dayjs | null) => {
    setStartDate(newValue);
    onChange(newValue, endDate); // Notificar cambios
  };

  const handleEndDateChange = (newValue: Dayjs | null) => {
    setEndDate(newValue);
    onChange(startDate, newValue); // Notificar cambios
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '8px',
          gap: '8px',
          width: '335px',
          backgroundColor: '#FFFFFF',
        }}
      >
        <DatePicker
          value={startDate}
          onChange={handleStartDateChange}
          format="DD/MM/YYYY" 
          slotProps={{
            textField: {
              variant: 'standard',
              placeholder: 'DD/MM/YYYY',
              InputProps: { disableUnderline: true },
              style: { width: '145px' },
            },
          }}
        />
        <ArrowRightAltIcon style={{ color: '#555' }} />
        <DatePicker
          value={endDate}
          onChange={handleEndDateChange}
          format="DD/MM/YYYY" 
          slotProps={{
            textField: {
              variant: 'standard',
              placeholder: 'DD/MM/YYYY',
              InputProps: { disableUnderline: true },
              style: { width: '145px' },
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DateRangeSelector;
