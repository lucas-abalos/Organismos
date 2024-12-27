// src/redux/slices/dataSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getVuelos, getAeropuertos, getAerolineas, getTerminales, getNOTAMS } from '../services/api';

interface DataState {
  aeropuertos: any[];
  aerolineas: any[];
  terminales: any[];
  selectedAirport: string; 
  selectedAirline: string; 
  selectedTerminal: string; 
  selectedFechaDesde: string;
  selectedFechaHasta: string;
  selectedTipoVuelo: string;
  selectedFechaNoTAMS: string;
  datosGrilla: any[];
  datosNOTAMS: any[];
  clickVigentes: boolean,
  clickPermanentes: boolean,
  clickVencidos: boolean,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: DataState = {
  aeropuertos: [],
  aerolineas: [],
  terminales: [],
  selectedAirport: '',
  selectedAirline: '', 
  selectedTerminal: '',
  selectedFechaDesde: '6',
  selectedFechaHasta: '0',
  selectedTipoVuelo: 'A',
  selectedFechaNoTAMS: '',
  datosGrilla: [],
  datosNOTAMS: [],
  clickVigentes: true,
  clickPermanentes: true,
  clickVencidos: false,
  status: 'idle',
  error: null,
};

// Thunk asíncrono para obtener los datos de vuelos
export const fetchVuelos = createAsyncThunk(
  'data/fetchVuelos',
  async (
    params: {
      id_arpt: string;      
      id_airline?: string;  
      sector?: string;      
      tiempo_antes?: string; 
      est_vuelos?: string;  
      movtp?: string;       
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await getVuelos(params); 
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk asíncrono para obtener los aeropuertos
export const fetchAeropuertos = createAsyncThunk(
  'data/fetchAeropuertos',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAeropuertos();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk asíncrono para obtener los aeropuertos
export const fetchAerolineas = createAsyncThunk(
  'data/fetchAerolineas',
  async (params: { id_arpt: string }, { rejectWithValue }) => {
    try {
      const data = await getAerolineas( params.id_arpt );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk asíncrono para obtener los aeropuertos
export const fetchTerminales = createAsyncThunk(
  'data/fetchTerminales',
  async (params: { id_arpt: string }, { rejectWithValue }) => {
    try {
      const data = await getTerminales( params.id_arpt );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Thunk asíncrono para obtener los datos de vuelos
export const fetchNOTAMS = createAsyncThunk(
  'data/fetchNOTAMS',
  async (
    params: {
      id_arpt: string;        
      fecha: string;  
    },
    { rejectWithValue }
  ) => {
    try {
      const data = await getNOTAMS(params); 
      
      const fechaActual = new Date();
      data.forEach((obj: { DT_TO: string; ESTADO: string; }) => {
        if (obj.DT_TO) {
          const dtToDate = convertirFechaFormato(obj.DT_TO);
          if (dtToDate >= fechaActual) {
            obj.ESTADO = "Vigente";
          } else {
            obj.ESTADO = "Vencido";
          }
        } else {
          obj.ESTADO = "Permanente";
        }
      });

      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Función para convertir el formato "DD/MM/YYYY" a "YYYY-MM-DD"
function convertirFechaFormato(fecha: string): Date {
  const [dia, mes, anio] = fecha.split('/');
  return new Date(`${anio}-${mes}-${dia}`);
}

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    // Reducer para manejar la selección del aeropuerto
    setSelectedAirport(state, action) {
      state.selectedAirport = action.payload; 
    },
    setSelectedAirline(state, action) {
      state.selectedAirline = action.payload; 
    },
    setSelectedTerminal(state, action) {
      state.selectedTerminal = action.payload; 
    },
    setSelectedFechaDesde(state, action) {
      state.selectedFechaDesde = action.payload; 
    },
    setSelectedFechaHasta(state, action) {
      state.selectedFechaHasta = action.payload; 
    },
    setSelectedTipoVuelo(state, action) {
      state.selectedTipoVuelo = action.payload; 
    },
    setSelectedFechaNoTAMS(state, action) {
      state.selectedFechaNoTAMS = action.payload; 
    },
    setClickVigentes(state, action) {
      state.clickVigentes = action.payload; 
    },
    setClickPermanentes(state, action) {
      state.clickPermanentes = action.payload; 
    },
    setClickVencidos(state, action) {
      state.clickVencidos = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAeropuertos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAeropuertos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.aeropuertos = action.payload; // Asigna los datos a aeropuertos
      })
      .addCase(fetchAeropuertos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchAerolineas.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAerolineas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.aerolineas = action.payload; // Asigna los datos a aerolineas
      })
      .addCase(fetchAerolineas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchTerminales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTerminales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.terminales = action.payload; // Asigna los datos a terminales
      })
      .addCase(fetchTerminales.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchVuelos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVuelos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.datosGrilla = action.payload; 
      })
      .addCase(fetchVuelos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchNOTAMS.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNOTAMS.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.datosNOTAMS = action.payload; 
      })
      .addCase(fetchNOTAMS.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedAirport } = dataSlice.actions; 
export const { setSelectedAirline } = dataSlice.actions; 
export const { setSelectedTerminal } = dataSlice.actions; 
export const { setSelectedFechaDesde } = dataSlice.actions; 
export const { setSelectedFechaHasta } = dataSlice.actions; 
export const { setSelectedTipoVuelo } = dataSlice.actions; 
export const { setSelectedFechaNoTAMS } = dataSlice.actions; 
export const { setClickVigentes } = dataSlice.actions; 
export const { setClickPermanentes } = dataSlice.actions; 
export const { setClickVencidos } = dataSlice.actions; 
export default dataSlice.reducer;

