import React from 'react';
import { Product } from '@domain/models/Product';

interface ProductListProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onProductClick,
  onAddToCart,
  isLoading = false,
  errorMessage = null
}) => {
  if (isLoading) {
    return (
      <div className="product-list-loading" aria-live="polite">
        <div className="loading-spinner" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="product-list-error" role="alert" aria-live="assertive">
        <p>Error al cargar los productos: {errorMessage}</p>
        <button onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-list-empty" role="status">
        <p>No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  const handleProductClick = (product: Product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToCart = (product: Product, event: React.MouseEvent) => {
    event.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const getStockStatus = (stock: number): string => {
    if (stock === 0) return 'Sin stock';
    if (stock < 5) return `Solo quedan ${stock}`;
    return 'En stock';
  };

  const getStockClass = (stock: number): string => {
    if (stock === 0) return 'stock-out';
    if (stock < 5) return 'stock-low';
    return 'stock-available';
  };

  return (
    <section className="product-list-container" aria-label="Catálogo de productos">
      <h2 className="product-list-title">Nuestros Productos</h2>
      <p className="product-list-count">
        Mostrando {products.length} producto{products.length !== 1 ? 's' : ''}
      </p>
      
      <ul className="product-grid" role="list">
        {products.map((product) => (
          <li 
            key={product.id} 
            className="product-card"
            onClick={() => handleProductClick(product)}
            role="listitem"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleProductClick(product);
              }
            }}
          >
            <article className="product-content">
              <header className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <span className="product-category">{product.category}</span>
              </header>
              
              <div className="product-description">
                <p>{product.description}</p>
              </div>
              
              <div className="product-details">
                <div className="product-price">
                  <span className="price-label">Precio:</span>
                  <span className="price-value">{formatPrice(product.price)}</span>
                </div>
                
                <div className={`product-stock ${getStockClass(product.stock)}`}>
                  <span className="stock-label">Disponibilidad:</span>
                  <span className="stock-value">{getStockStatus(product.stock)}</span>
                </div>
              </div>
              
              <footer className="product-actions">
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.stock === 0}
                  aria-label={`Añadir ${product.name} al carrito`}
                >
                  {product.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
              </footer>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};