import { useState, useCallback } from 'react';
import { ProductService } from '../../domain/services/ProductService';
import { Product } from '../../domain/models/Product';

interface UseProductsState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

interface UseProductsActions {
  loadProducts: () => Promise<void>;
  getProductById: (id: string) => Promise<Product | null>;
  createProduct: (productData: Partial<Product>) => Promise<Product>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<Product>;
  deleteProduct: (id: string) => Promise<void>;
  isProductAvailable: (id: string) => Promise<boolean>;
  clearError: () => void;
}

export type UseProductsReturn = UseProductsState & UseProductsActions;

export function useProducts(service?: ProductService): UseProductsReturn {
  const productService = service || new ProductService();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedProducts = await productService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar productos';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [productService]);

  const getProductById = useCallback(async (id: string): Promise<Product | null> => {
    setIsLoading(true);
    setError(null);
    try {
      const product = await productService.getProductById(id);
      return product;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al obtener producto';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [productService]);

  const createProduct = useCallback(async (productData: Partial<Product>): Promise<Product> => {
    setIsLoading(true);
    setError(null);
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      return newProduct;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear producto';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [productService]);

  const updateProduct = useCallback(async (id: string, updates: Partial<Product>): Promise<Product> => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedProduct = await productService.updateProduct(id, updates);
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
      return updatedProduct;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al actualizar producto';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [productService]);

  const deleteProduct = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al eliminar producto';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [productService]);

  const isProductAvailable = useCallback(async (id: string): Promise<boolean> => {
    try {
      return await productService.isProductAvailable(id);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al verificar disponibilidad';
      setError(message);
      return false;
    }
  }, [productService]);

  return {
    products,
    isLoading,
    error,
    loadProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    isProductAvailable,
    clearError
  };
}