// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://test-tamsqa.corpam.com.ar/WebAPI/api/Organismos', 
});

export const getVuelos = async (params: {
  id_arpt: string;
  id_airline?: string;
  sector?: string;
  tiempo_antes?: string;
  est_vuelos?: string; 
  movtp?: string;
}) => {
  const response = await api.get('/GetVuelos', { params });
  return response.data;
};

export const getCantidadNOTAMS = async (fecha: string, id_arpt: string) => {
  const response = await api.get('/GetCantidadNOTAMS', { params: { fecha, id_arpt } });
  return response.data;
};

export const getNOTAMS = async (params: {
  id_arpt: string;
  fecha: string;
}) => {
  const response = await api.get('/GetNOTAMS', { params });
  return response.data;
};

export const getAeropuertos = async () => {
  const response = await api.get('/GetAeropuertos');
  return response.data;
};

export const getAerolineas = async (id_arpt: string) => {
  const response = await api.get('/GetAerolineas', { params: { id_arpt } });
  return response.data;
};

export const getTerminales = async (id_arpt: string) => {
  const response = await api.get('/GetTerminales', { params: { id_arpt } });
  return response.data;
};
