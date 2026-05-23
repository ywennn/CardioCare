import axios from 'axios';

const apiPredict = axios.create({
  baseURL: 'http://0.0.0.0:8000',
  timeout: 5000,
});

export const predict = async (data) => {
  try {
    const response = await apiPredict.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error('Error during prediction:', error);
    throw error;
  }
};

export default predict;
