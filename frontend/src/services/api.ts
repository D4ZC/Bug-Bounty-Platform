import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse, PaginatedResponse } from '@/types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL || '/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor para añadir token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor para manejar errores
    this.api.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          // Disparar evento personalizado para logout global
          window.dispatchEvent(new CustomEvent('session-expired'));
          window.location.href = '/auth/login?expired=1';
        }
        return Promise.reject(error);
      },
    );
  }

  // Métodos genéricos
  async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.get(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.post(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.put(url, data, config);
    return response.data;
  }

  async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.patch(url, data, config);
    return response.data;
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.api.delete(url, config);
    return response.data;
  }

  // Métodos para obtener respuestas paginadas
  async getPaginated<T>(
    url: string,
    params?: any,
  ): Promise<PaginatedResponse<T>> {
    const response = await this.api.get(url, { params });
    return response.data;
  }

  // Métodos para subir archivos
  async uploadFile(
    url: string,
    file: File,
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<any>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  // Métodos para subir múltiples archivos
  async uploadFiles(
    url: string,
    files: File[],
    onProgress?: (progress: number) => void,
  ): Promise<ApiResponse<any>> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await this.api.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          onProgress(progress);
        }
      },
    });

    return response.data;
  }

  // Actualizar XP y nivel de usuario
  async updateUserXP(userId: string, xp: number, level: number) {
    return this.patch(`/users/${userId}/xp`, { xp, level });
  }

  // Actualizar logros de usuario
  async updateUserAchievements(userId: string, achievements: any[]) {
    return this.patch(`/users/${userId}/achievements`, { achievements });
  }

  // Obtener historial de canjes de usuario
  async getUserRedemptions(userId: string) {
    return this.get(`/users/${userId}/redemptions`);
  }

  // Agregar un canje de tienda
  async addUserRedemption(userId: string, redemption: any) {
    return this.post(`/users/${userId}/redemptions`, redemption);
  }

  // Obtener historial de actividades de usuario
  async getUserActivity(userId: string) {
    return this.get(`/users/${userId}/activity`);
  }

  // Agregar una actividad al historial
  async addUserActivity(userId: string, activity: any) {
    return this.post(`/users/${userId}/activity`, activity);
  }

  // Obtener ranking global de usuarios
  async getUserRanking() {
    return this.get('/rankings/users');
  }

  // Obtener todos los clanes
  async getClans() {
    return this.get('/teams');
  }

  // Obtener detalles de un clan
  async getClanById(clanId: string) {
    return this.get(`/teams/${clanId}`);
  }

  // Crear un nuevo clan
  async createClan(data: { name: string; description: string; logo?: string; leader: string }) {
    return this.post('/teams', data);
  }

  // Unirse a un clan
  async joinClan(clanId: string, username: string) {
    return this.post(`/teams/${clanId}/join`, { username });
  }

  // Salir de un clan
  async leaveClan(clanId: string, username: string) {
    return this.post(`/teams/${clanId}/leave`, { username });
  }
}

export const apiService = new ApiService();
export default apiService;
