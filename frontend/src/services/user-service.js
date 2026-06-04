import api from './api';

export const getMe = async () => {
  return api.get('/users/me');
};

export const updateProfile = async (data) => {
  return api.put('/users/me', data);
};

export const updatePassword = async (data) => {
  return api.put('/users/me/password', data);
};

export const deleteAccount = async () => {
  return api.delete('/users/me');
};
