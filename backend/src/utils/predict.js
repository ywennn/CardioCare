import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const apiPredict = axios.create({
  baseURL: process.env.PREDICT_API_URL || 'http://localhost:5000',
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
