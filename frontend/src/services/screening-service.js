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

export const screeningSummary = async () => {
  return await api.get(`/screening/summary`);
};

export const trendSummary = async (period = '30d') => {
  return await api.get(`/screening/trend?period=${period}`);
};

export const historyScreening = async () => {
  return await api.get(`/screening/histories`);
};
