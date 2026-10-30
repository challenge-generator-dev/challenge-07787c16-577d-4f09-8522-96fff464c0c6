import { Product, validateProduct, createProduct, updateProduct } from '../models/Product';

/**
 * Servicio de dominio para manejar operaciones relacionadas con productos.
 * Encapsula la lógica de negocio y coordinación con la capa de infraestructura.
 */
export class ProductService {
    constructor(
        private readonly productRepository: {
            getAll: () => Promise<Product[]>;
            getById: (id: string) => Promise<Product | null>;
            create: (product: Product) => Promise<Product>;
            update: (id: string, product: Product) => Promise<Product>;
            delete: (id: string) => Promise<void>;
        }
    ) {}

    /**
     * Obtiene todos los productos disponibles.
     * @returns Lista de productos
     */
    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.getAll();
    }

    /**
     * Obtiene un producto por su ID.
     * @param id ID del producto
     * @returns Producto o null si no existe
     */
    async getProductById(id: string): Promise<Product | null> {
        return this.productRepository.getById(id);
    }

    /**
     * Crea un nuevo producto.
     * @param productData Datos del producto
     * @returns Producto creado
     * @throws Error si los datos no son válidos
     */
    async createProduct(productData: Partial<Product>): Promise<Product> {
        const validation = validateProduct(productData);
        if (!validation.isValid) {
            throw new Error(`Datos de producto inválidos: ${validation.errors.join(', ')}`);
        }

        const product = createProduct(productData);
        return this.productRepository.create(product);
    }

    /**
     * Actualiza un producto existente.
     * @param id ID del producto
     * @param updates Datos a actualizar
     * @returns Producto actualizado
     * @throws Error si el producto no existe o los datos son inválidos
     */
    async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
        const existingProduct = await this.productRepository.getById(id);
        if (!existingProduct) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }

        const validation = validateProduct({ ...existingProduct, ...updates });
        if (!validation.isValid) {
            throw new Error(`Datos de producto inválidos: ${validation.errors.join(', ')}`);
        }

        const updatedProduct = updateProduct(existingProduct, updates);
        return this.productRepository.update(id, updatedProduct);
    }

    /**
     * Elimina un producto.
     * @param id ID del producto
     * @throws Error si el producto no existe
     */
    async deleteProduct(id: string): Promise<void> {
        const existingProduct = await this.productRepository.getById(id);
        if (!existingProduct) {
            throw new Error(`Producto con ID ${id} no encontrado`);
        }
        await this.productRepository.delete(id);
    }

    /**
     * Verifica si un producto está disponible para venta.
     * @param id ID del producto
     * @returns Verdadero si el producto está disponible
     */
    async isProductAvailable(id: string): Promise<boolean> {
        const product = await this.productRepository.getById(id);
        return product ? product.stock > 0 && product.price > 0 : false;
    }
}