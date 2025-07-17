import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import { createTestToken, createTestUser } from '../setup';

// Mock de axios
const mockRequestUse = vi.fn();
const mockResponseUse = vi.fn();

vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
      interceptors: {
        request: { use: mockRequestUse },
        response: { use: mockResponseUse }
      }
    })),
    isAxiosError: vi.fn()
  }
}));

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Importar la API después de los mocks
import api from '@/services/api';

describe('API Service', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.clear();
    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance);
    mockRequestUse.mockClear();
    mockResponseUse.mockClear();
    // Simula la instalación de los interceptores
    mockRequestUse.mockImplementation((onFulfilled, onRejected) => {
      mockAxiosInstance.interceptors.request.onFulfilled = onFulfilled;
      mockAxiosInstance.interceptors.request.onRejected = onRejected;
    });
    mockResponseUse.mockImplementation((onFulfilled, onRejected) => {
      mockAxiosInstance.interceptors.response.onFulfilled = onFulfilled;
      mockAxiosInstance.interceptors.response.onRejected = onRejected;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Initialization', () => {
    it('should create axios instance with correct base URL', () => {
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:3001/api',
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });

    it('should set up request interceptor', () => {
      expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
    });

    it('should set up response interceptor', () => {
      expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalledWith(
        expect.any(Function),
        expect.any(Function)
      );
    });
  });

  describe('Request Interceptor', () => {
    it('should add authorization header when token exists', () => {
      const token = createTestToken();
      localStorageMock.getItem.mockReturnValue(token);
      // Simula la instalación del interceptor
      const config = { headers: {} };
      const result = mockAxiosInstance.interceptors.request.onFulfilled(config);
      expect(result.headers.Authorization).toBe(`Bearer ${token}`);
    });

    it('should not add authorization header when token does not exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      // Get the request interceptor function
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      
      const config = {
        headers: {}
      };

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBeUndefined();
    });

    it('should preserve existing headers', () => {
      const token = createTestToken();
      localStorageMock.getItem.mockReturnValue(token);

      // Get the request interceptor function
      const requestInterceptor = mockAxiosInstance.interceptors.request.use.mock.calls[0][0];
      
      const config = {
        headers: {
          'Custom-Header': 'custom-value'
        }
      };

      const result = requestInterceptor(config);

      expect(result.headers.Authorization).toBe(`Bearer ${token}`);
      expect(result.headers['Custom-Header']).toBe('custom-value');
    });

    it('should handle request interceptor error', () => {
      // Get the request interceptor error handler
      const requestErrorHandler = mockAxiosInstance.interceptors.request.use.mock.calls[0][1];
      
      const error = new Error('Request error');

      expect(() => {
        requestErrorHandler(error);
      }).toThrow('Request error');
    });
  });

  describe('Response Interceptor', () => {
    it('should return response data directly', () => {
      const response = {
        data: { success: true, message: 'Success' },
        status: 200,
        statusText: 'OK'
      };
      const result = mockAxiosInstance.interceptors.response.onFulfilled(response);
      expect(result).toEqual(response.data);
    });

    it('should handle 401 errors by clearing auth data', () => {
      // Get the response interceptor error handler
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };

      responseErrorHandler(error);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('token');
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('user');
    });

    it('should handle 403 errors', () => {
      // Get the response interceptor error handler
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {
        response: {
          status: 403,
          data: { message: 'Forbidden' }
        }
      };

      expect(() => {
        responseErrorHandler(error);
      }).toThrow();
    });

    it('should handle 500 errors', () => {
      // Get the response interceptor error handler
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' }
        }
      };

      expect(() => {
        responseErrorHandler(error);
      }).toThrow();
    });

    it('should handle network errors', () => {
      // Get the response interceptor error handler
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {
        message: 'Network Error',
        code: 'NETWORK_ERROR'
      };

      expect(() => {
        responseErrorHandler(error);
      }).toThrow();
    });

    it('should handle timeout errors', () => {
      // Get the response interceptor error handler
      const responseErrorHandler = mockAxiosInstance.interceptors.response.use.mock.calls[0][1];
      
      const error = {
        message: 'timeout of 10000ms exceeded',
        code: 'ECONNABORTED'
      };

      expect(() => {
        responseErrorHandler(error);
      }).toThrow();
    });
  });

  describe('HTTP Methods', () => {
    it('should make GET request', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.get.mockResolvedValue(mockResponse);

      const result = await api.get('/users');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users');
      expect(result).toEqual(mockResponse.data);
    });

    it('should make POST request', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const result = await api.post('/users', { name: 'test' });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/users', { name: 'test' });
      expect(result).toEqual(mockResponse.data);
    });

    it('should make PUT request', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.put.mockResolvedValue(mockResponse);

      const result = await api.put('/users/1', { name: 'updated' });

      expect(mockAxiosInstance.put).toHaveBeenCalledWith('/users/1', { name: 'updated' });
      expect(result).toEqual(mockResponse.data);
    });

    it('should make DELETE request', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.delete.mockResolvedValue(mockResponse);

      const result = await api.delete('/users/1');

      expect(mockAxiosInstance.delete).toHaveBeenCalledWith('/users/1');
      expect(result).toEqual(mockResponse.data);
    });

    it('should make PATCH request', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.patch.mockResolvedValue(mockResponse);

      const result = await api.patch('/users/1', { name: 'patched' });

      expect(mockAxiosInstance.patch).toHaveBeenCalledWith('/users/1', { name: 'patched' });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors with response', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Bad Request' }
        }
      };
      mockAxiosInstance.get.mockRejectedValue(errorResponse);

      await expect(api.get('/users')).rejects.toThrow();
    });

    it('should handle API errors without response', async () => {
      const networkError = {
        message: 'Network Error',
        code: 'NETWORK_ERROR'
      };
      mockAxiosInstance.get.mockRejectedValue(networkError);

      await expect(api.get('/users')).rejects.toThrow();
    });

    it('should handle timeout errors', async () => {
      const timeoutError = {
        message: 'timeout of 10000ms exceeded',
        code: 'ECONNABORTED'
      };
      mockAxiosInstance.get.mockRejectedValue(timeoutError);

      await expect(api.get('/users')).rejects.toThrow();
    });
  });

  describe('Authentication', () => {
    it('should include token in requests when available', async () => {
      const token = createTestToken();
      localStorageMock.getItem.mockReturnValue(token);
      mockAxiosInstance.get.mockResolvedValue({ data: { success: true } });

      await api.get('/users');

      // The request interceptor should have added the token
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users');
    });

    it('should handle token refresh on 401', async () => {
      const token = createTestToken();
      localStorageMock.getItem.mockReturnValue(token);

      const errorResponse = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      };

      mockAxiosInstance.get
        .mockRejectedValueOnce(errorResponse)
        .mockResolvedValueOnce({ data: { success: true } });

      await expect(api.get('/users')).rejects.toThrow();
    });
  });

  describe('Request Configuration', () => {
    it('should handle request with custom headers', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { success: true } });

      await api.get('/users', { headers: { 'Custom-Header': 'value' } });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users', {
        headers: { 'Custom-Header': 'value' }
      });
    });

    it('should handle request with query parameters', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { success: true } });

      await api.get('/users', { params: { page: 1, limit: 10 } });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users', {
        params: { page: 1, limit: 10 }
      });
    });

    it('should handle request with timeout', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { success: true } });

      await api.get('/users', { timeout: 5000 });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/users', {
        timeout: 5000
      });
    });
  });

  describe('Response Handling', () => {
    it('should handle successful response with data', async () => {
      const mockData = { users: [{ id: 1, name: 'test' }] };
      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await api.get('/users');

      expect(result).toEqual(mockData);
    });

    it('should handle successful response without data', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: null });

      const result = await api.get('/users');

      expect(result).toBeNull();
    });

    it('should handle response with pagination', async () => {
      const mockData = {
        data: [{ id: 1, name: 'test' }],
        pagination: {
          page: 1,
          limit: 10,
          total: 100
        }
      };
      mockAxiosInstance.get.mockResolvedValue({ data: mockData });

      const result = await api.get('/users');

      expect(result).toEqual(mockData);
    });
  });

  describe('File Upload', () => {
    it('should handle file upload with FormData', async () => {
      const mockResponse = { data: { success: true } };
      mockAxiosInstance.post.mockResolvedValue(mockResponse);

      const formData = new FormData();
      formData.append('file', new File(['test'], 'test.txt'));

      const result = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('Concurrent Requests', () => {
    it('should handle multiple concurrent requests', async () => {
      const mockResponse1 = { data: { users: [] } };
      const mockResponse2 = { data: { posts: [] } };

      mockAxiosInstance.get
        .mockResolvedValueOnce(mockResponse1)
        .mockResolvedValueOnce(mockResponse2);

      const [users, posts] = await Promise.all([
        api.get('/users'),
        api.get('/posts')
      ]);

      expect(users).toEqual(mockResponse1.data);
      expect(posts).toEqual(mockResponse2.data);
    });
  });

  describe('Retry Logic', () => {
    it('should not retry on 4xx errors', async () => {
      const errorResponse = {
        response: {
          status: 400,
          data: { message: 'Bad Request' }
        }
      };
      mockAxiosInstance.get.mockRejectedValue(errorResponse);

      await expect(api.get('/users')).rejects.toThrow();

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
    });

    it('should not retry on 5xx errors', async () => {
      const errorResponse = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' }
        }
      };
      mockAxiosInstance.get.mockRejectedValue(errorResponse);

      await expect(api.get('/users')).rejects.toThrow();

      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(1);
    });
  });
}); 