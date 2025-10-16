import apiClient from './apiClient';

export const chatWithAI = async (message) => {
  const response = await apiClient.post('/chat', { message });
  return response.data;
};

export const reflectOnEntry = async (entryText) => {
  const response = await apiClient.post('/memory/reflect', { entry_text: entryText });
  return response.data;
};

export const getWeeklySummary = async () => {
  const response = await apiClient.get('/summary');
  return response.data;
};

export const getMemoryHistory = async () => {
  const response = await apiClient.get('/memory/history');
  return response.data;
};

export const getWeeklyInsights = async () => {
  const response = await apiClient.get('/memory/weekly-insights');
  return response.data;
};