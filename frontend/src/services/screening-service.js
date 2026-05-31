import api from './api';

export const createScreening = async (data) => {
  return await api.post('/screening', data);
};

export const screeningResult = async (screeningId) => {
  return await api.get(`/screening/histories/${screeningId}`);
};

export const exportScreeningResult = async (screeningId) => {
  return await api.get(`/screening/histories/${screeningId}/export`, {
    responseType: 'blob',
  });
};
