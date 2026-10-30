/**
 * Modelo de dominio que representa un producto en el sistema.
 * Contiene las propiedades esenciales y lógica de validación.
 */
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}

export const validateProduct = (product: Partial<Product>): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!product.name || product.name.trim().length < 3) {
        errors.push('El nombre del producto debe tener al menos 3 caracteres');
    }

    if (!product.description || product.description.trim().length < 10) {
        errors.push('La descripción debe tener al menos 10 caracteres');
    }

    if (product.price === undefined || product.price <= 0) {
        errors.push('El precio debe ser mayor que 0');
    }

    if (product.stock === undefined || product.stock < 0) {
        errors.push('El stock no puede ser negativo');
    }

    if (!product.category || product.category.trim().length === 0) {
        errors.push('La categoría es obligatoria');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Crea un nuevo producto con valores por defecto.
 * @param partialProduct Datos parciales del producto
 * @returns Producto completo con valores por defecto
 */
export const createProduct = (partialProduct: Partial<Product>): Product => {
    const now = new Date();
    return {
        id: partialProduct.id || crypto.randomUUID(),
        name: partialProduct.name || '',
        description: partialProduct.description || '',
        price: partialProduct.price || 0,
        stock: partialProduct.stock || 0,
        category: partialProduct.category || '',
        imageUrl: partialProduct.imageUrl,
        createdAt: partialProduct.createdAt || now,
        updatedAt: partialProduct.updatedAt || now
    };
};

/**
 * Actualiza las propiedades de un producto existente.
 * @param existingProduct Producto existente
 * @param updates Actualizaciones parciales
 * @returns Producto actualizado
 */
export const updateProduct = (existingProduct: Product, updates: Partial<Product>): Product => {
    return {
        ...existingProduct,
        ...updates,
        updatedAt: new Date()
    };
};

/**
 * Verifica si un producto está disponible para venta.
 * @param product Producto a verificar
 * @returns Verdadero si el producto tiene stock y precio válido
 */
export const isProductAvailable = (product: Product): boolean => {
    return product.stock > 0 && product.price > 0;
};