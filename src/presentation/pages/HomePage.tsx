import React, { useEffect, useState } from 'react';
import { ProductList } from '@presentation/components/ProductList';
import { useProducts } from '@shared/hooks/useProducts';
import { Product } from '@domain/models/Product';

export const HomePage: React.FC = () => {
  const { 
    products, 
    isLoading, 
    error, 
    fetchProducts, 
    addToCart 
  } = useProducts();
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleProductClick = (product: Product): void => {
    setSelectedProduct(product);
    console.log(`Producto seleccionado: ${product.name}`);
  };

  const handleAddToCart = async (product: Product): Promise<void> => {
    try {
      await addToCart(product);
      setCartCount((prev) => prev + 1);
      setNotification(`${product.name} añadido al carrito`);
    } catch (err) {
      console.error('Error al añadir al carrito:', err);
      setNotification('Error al añadir el producto al carrito');
    }
  };

  const handleCloseDetail = (): void => {
    setSelectedProduct(null);
  };

  const handleRefreshProducts = (): void => {
    fetchProducts();
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <h1 className="site-title">Tienda Online</h1>
          <nav className="header-nav" aria-label="Navegación principal">
            <button 
              className="nav-button"
              onClick={handleRefreshProducts}
              aria-label="Actualizar productos"
            >
              Actualizar
            </button>
            <div className="cart-indicator" aria-label={`Carrito con ${cartCount} artículos`}>
              <span className="cart-icon" role="img" aria-label="Carrito">🛒</span>
              <span className="cart-count">{cartCount}</span>
            </div>
          </nav>
        </div>
      </header>

      {notification && (
        <div 
          className="notification-toast" 
          role="status" 
          aria-live="polite"
        >
          {notification}
        </div>
      )}

      <main className="home-main">
        <section className="products-section">
          <ProductList
            products={products}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            isLoading={isLoading}
            errorMessage={error}
          />
        </section>

        {selectedProduct && (
          <div 
            className="product-detail-overlay" 
            onClick={handleCloseDetail}
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-title"
          >
            <div 
              className="product-detail-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <header className="detail-header">
                <h2 id="detail-title" className="detail-title">
                  {selectedProduct.name}
                </h2>
                <button 
                  className="close-button"
                  onClick={handleCloseDetail}
                  aria-label="Cerrar detalles"
                >
                  ×
                </button>
              </header>
              
              <div className="detail-content">
                <p className="detail-category">{selectedProduct.category}</p>
                <p className="detail-description">{selectedProduct.description}</p>
                <div className="detail-price">
                  <strong>Precio:</strong> {selectedProduct.price}€
                </div>
                <div className="detail-stock">
                  <strong>Stock:</strong> {selectedProduct.stock} unidades
                </div>
              </div>
              
              <footer className="detail-footer">
                <button
                  className="detail-add-btn"
                  onClick={() => handleAddToCart(selectedProduct)}
                  disabled={selectedProduct.stock === 0}
                >
                  {selectedProduct.stock === 0 ? 'Agotado' : 'Añadir al carrito'}
                </button>
              </footer>
            </div>
          </div>
        )}
      </main>

      <footer className="home-footer">
        <p>© 2024 Tienda Online. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};