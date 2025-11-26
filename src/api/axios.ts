import axios from 'axios';

export const apiClient = axios.create({
  baseURL: 'https://tasks-service-maks1394.amvera.io', //TODO: Добавить в переменную окружения
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);
