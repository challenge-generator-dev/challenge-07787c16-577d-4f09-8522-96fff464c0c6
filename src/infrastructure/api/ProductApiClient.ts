import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { Product } from '@domain/models/Product';

export interface ProductApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  page?: number;
  pageSize?: number;
}

const DEFAULT_TIMEOUT = 10000;
const DEFAULT_PAGE_SIZE = 20;

export class ProductApiClient {
  private readonly client: AxiosInstance;
  private readonly baseURL: string;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL,
      timeout: DEFAULT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`[ProductApiClient] Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('[ProductApiClient] Request error:', error);
        return Promise.reject(error);
      }
    );

    this.client.interceptors.response.use(
      (response) => {
        console.log(`[ProductApiClient] Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error: AxiosError<ProductApiError>) => {
        const enhancedError = this.enhanceError(error);
        console.error('[ProductApiClient] Response error:', enhancedError);
        return Promise.reject(enhancedError);
      }
    );
  }

  private getAuthToken(): string | null {
    try {
      return sessionStorage.getItem('auth_token');
    } catch {
      return null;
    }
  }

  private enhanceError(error: AxiosError<ProductApiError>): ProductApiError {
    if (error.response) {
      const data = error.response.data as ProductApiError | undefined;
      return {
        message: data?.message || error.message || 'Error del servidor',
        code: data?.code || `HTTP_${error.response.status}`,
        status: error.response.status,
        details: data?.details,
      };
    } else if (error.request) {
      return {
        message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
        code: 'NETWORK_ERROR',
        status: 0,
      };
    } else {
      return {
        message: error.message || 'Error desconocido',
        code: 'UNKNOWN_ERROR',
        status: 0,
      };
    }
  }

  private buildQueryString(filters: ProductFilters): string {
    const params = new URLSearchParams();
    
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice !== undefined) params.append('minPrice', String(filters.minPrice));
    if (filters.maxPrice !== undefined) params.append('maxPrice', String(filters.maxPrice));
    if (filters.inStock !== undefined) params.append('inStock', String(filters.inStock));
    if (filters.search) params.append('search', filters.search);
    if (filters.page !== undefined) params.append('page', String(filters.page));
    if (filters.pageSize !== undefined) params.append('pageSize', String(filters.pageSize));
    
    return params.toString();
  }

  async getAllProducts(filters?: ProductFilters): Promise<Product[]> {
    try {
      const config: AxiosRequestConfig = {};
      
      if (filters) {
        const queryString = this.buildQueryString(filters);
        config.params = filters;
      }

      const response: AxiosResponse<Product[]> = await this.client.get<Product[]>(
        '/products',
        config
      );
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProductsPaginated(filters: ProductFilters): Promise<PaginatedResponse<Product>> {
    try {
      const paginationFilters: ProductFilters = {
        ...filters,
        page: filters.page || 1,
        pageSize: filters.pageSize || DEFAULT_PAGE_SIZE,
      };

      const response: AxiosResponse<PaginatedResponse<Product>> = await this.client.get<PaginatedResponse<Product>>(
        '/products/paginated',
        { params: paginationFilters }
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const response: AxiosResponse<Product> = await this.client.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        return null;
      }
      throw this.handleError(error);
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const payload = this.sanitizeProductData(productData);
      this.validateProductData(payload);

      const response: AxiosResponse<Product> = await this.client.post<Product>(
        '/products',
        payload
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    try {
      const payload = this.sanitizeProductData(updates);
      
      if (Object.keys(payload).length === 0) {
        throw new Error('No hay datos para actualizar');
      }

      const response: AxiosResponse<Product> = await this.client.patch<Product>(
        `/products/${id}`,
        payload
      );

      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.client.delete(`/products/${id}`);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async checkProductAvailability(id: string): Promise<boolean> {
    try {
      const response: AxiosResponse<{ available: boolean }> = await this.client.get<{ available: boolean }>(
        `/products/${id}/availability`
      );
      return response.data.available;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCategories(): Promise<string[]> {
    try {
      const response: AxiosResponse<string[]> = await this.client.get<string[]>('/products/categories');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private sanitizeProductData(data: Partial<Product>): Partial<Product> {
    const sanitized: Partial<Product> = {};

    if (data.name !== undefined) {
      sanitized.name = data.name.trim();
    }
    if (data.description !== undefined) {
      sanitized.description = data.description.trim();
    }
    if (data.price !== undefined) {
      sanitized.price = Number(data.price);
    }
    if (data.stock !== undefined) {
      sanitized.stock = Number(data.stock);
    }
    if (data.category !== undefined) {
      sanitized.category = data.category.trim();
    }
    if (data.imageUrl !== undefined) {
      sanitized.imageUrl = data.imageUrl.trim();
    }
    if (data.isActive !== undefined) {
      sanitized.isActive = Boolean(data.isActive);
    }

    return sanitized;
  }

  private validateProductData(data: Partial<Product>): void {
    const errors: string[] = [];

    if (data.name !== undefined && (!data.name || data.name.length < 3)) {
      errors.push('El nombre debe tener al menos 3 caracteres');
    }

    if (data.description !== undefined && (!data.description || data.description.length < 10)) {
      errors.push('La descripción debe tener al menos 10 caracteres');
    }

    if (data.price !== undefined && (isNaN(data.price) || data.price <= 0)) {
      errors.push('El precio debe ser mayor que 0');
    }

    if (data.stock !== undefined && (isNaN(data.stock) || data.stock < 0)) {
      errors.push('El stock no puede ser negativo');
    }

    if (data.category !== undefined && !data.category) {
      errors.push('La categoría es requerida');
    }

    if (errors.length > 0) {
      const error: ProductApiError & { isValidationError: boolean } = {
        message: 'Error de validación',
        code: 'VALIDATION_ERROR',
        status: 400,
        details: { general: errors },
        isValidationError: true,
      };
      throw error;
    }
  }

  private handleError(error: unknown): ProductApiError {
    if (this.isProductApiError(error)) {
      return error;
    }

    if (axios.isAxiosError(error)) {
      return this.enhanceError(error);
    }

    return {
      message: error instanceof Error ? error.message : 'Error desconocido',
      code: 'INTERNAL_ERROR',
      status: 500,
    };
  }

  private isProductApiError(error: unknown): error is ProductApiError {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      'code' in error &&
      'status' in error
    );
  }

  setBaseURL(url: string): void {
    this.client.defaults.baseURL = url;
  }

  setAuthToken(token: string): void {
    try {
      sessionStorage.setItem('auth_token', token);
    } catch (error) {
      console.error('[ProductApiClient] Failed to store auth token:', error);
    }
  }

  clearAuthToken(): void {
    try {
      sessionStorage.removeItem('auth_token');
    } catch (error) {
      console.error('[ProductApiClient] Failed to clear auth token:', error);
    }
  }
}

export const productApiClient = new ProductApiClient();