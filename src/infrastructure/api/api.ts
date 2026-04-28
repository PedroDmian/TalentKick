import axios from 'axios';
import { Config } from '../../core/config/config';
import { useAuthStore } from '../../presentation/store/useAuthStore';

export const api = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.defaults.adapter = 'xhr';

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;

    if (token && token !== 'null') {
      // Usar bracket notation o .set para mayor compatibilidad con AxiosHeaders
      if (config.headers) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      console.log(`[API] Token enviado a ${config.url}`);
    } else {
      console.log(`[API] No hay token para la ruta ${config.url}`);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
