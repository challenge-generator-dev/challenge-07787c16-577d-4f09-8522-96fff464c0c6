import { Product } from '../../domain/models/Product';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface FieldValidation {
  field: string;
  message: string;
}

export function validateProduct(product: Partial<Product>): ValidationResult {
  const errors: string[] = [];

  if (!product.name || product.name.trim().length < 3) {
    errors.push('El nombre del producto debe tener al menos 3 caracteres');
  }

  if (!product.description || product.description.trim().length < 10) {
    errors.push('La descripción debe tener al menos 10 caracteres');
  }

  if (product.price === undefined || product.price <= 0) {
    errors.push('El precio debe ser mayor a 0');
  }

  if (product.stock === undefined || product.stock < 0) {
    errors.push('El stock no puede ser negativo');
  }

  if (!product.category || product.category.trim().length === 0) {
    errors.push('La categoría es requerida');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateProductName(name: string): FieldValidation | null {
  if (!name || name.trim().length < 3) {
    return { field: 'name', message: 'El nombre debe tener al menos 3 caracteres' };
  }
  if (name.trim().length > 100) {
    return { field: 'name', message: 'El nombre no puede exceder 100 caracteres' };
  }
  return null;
}

export function validateProductDescription(description: string): FieldValidation | null {
  if (!description || description.trim().length < 10) {
    return { field: 'description', message: 'La descripción debe tener al menos 10 caracteres' };
  }
  if (description.trim().length > 500) {
    return { field: 'description', message: 'La descripción no puede exceder 500 caracteres' };
  }
  return null;
}

export function validateProductPrice(price: number | undefined): FieldValidation | null {
  if (price === undefined) {
    return { field: 'price', message: 'El precio es requerido' };
  }
  if (price <= 0) {
    return { field: 'price', message: 'El precio debe ser mayor a 0' };
  }
  if (price > 999999.99) {
    return { field: 'price', message: 'El precio excede el límite permitido' };
  }
  return null;
}

export function validateProductStock(stock: number | undefined): FieldValidation | null {
  if (stock === undefined) {
    return { field: 'stock', message: 'El stock es requerido' };
  }
  if (stock < 0) {
    return { field: 'stock', message: 'El stock no puede ser negativo' };
  }
  if (stock > 999999) {
    return { field: 'stock', message: 'El stock excede el límite permitido' };
  }
  return null;
}

export function validateProductCategory(category: string): FieldValidation | null {
  const validCategories = ['electronics', 'clothing', 'food', 'books', 'home', 'sports', 'toys', 'other'];
  
  if (!category || category.trim().length === 0) {
    return { field: 'category', message: 'La categoría es requerida' };
  }
  
  const normalizedCategory = category.trim().toLowerCase();
  if (!validCategories.includes(normalizedCategory)) {
    return { 
      field: 'category', 
      message: `Categoría inválida. Las categorías válidas son: ${validCategories.join(', ')}` 
    };
  }
  return null;
}

export function sanitizeProductInput(input: Partial<Product>): Partial<Product> {
  const sanitized: Partial<Product> = {};
  
  if (input.name) {
    sanitized.name = input.name.trim();
  }
  
  if (input.description) {
    sanitized.description = input.description.trim();
  }
  
  if (input.price !== undefined) {
    sanitized.price = Math.round(input.price * 100) / 100;
  }
  
  if (input.stock !== undefined) {
    sanitized.stock = Math.max(0, Math.floor(input.stock));
  }
  
  if (input.category) {
    sanitized.category = input.category.trim().toLowerCase();
  }
  
  return sanitized;
}

export function isProductAvailable(product: Product): boolean {
  return product.stock > 0 && product.price > 0;
}