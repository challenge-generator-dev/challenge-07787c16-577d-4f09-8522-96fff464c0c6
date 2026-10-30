import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import HomePage from './presentation/pages/HomePage';
import ProductList from './presentation/components/ProductList';
import { useProducts } from './shared/hooks/useProducts';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function AppRoutes() {
  const productsHook = useProducts();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductList {...productsHook} />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function ProductDetail() {
  return (
    <div className="product-detail-container">
      <h2>Detalle del Producto</h2>
      <p>Página de detalles en construcción</p>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="app-container">
          <header className="app-header">
            <nav className="main-navigation">
              <div className="nav-brand">
                <h1>Arquitectura React</h1>
              </div>
              <ul className="nav-links">
                <li>
                  <a href="/" className="nav-link">Inicio</a>
                </li>
                <li>
                  <a href="/products" className="nav-link">Productos</a>
                </li>
              </ul>
            </nav>
          </header>
          <main className="app-main">
            <AppRoutes />
          </main>
          <footer className="app-footer">
            <p>© 2024 Arquitectura de Aplicaciones - Estilos y Tácticas</p>
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;