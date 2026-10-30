# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/presentation/components/ProductList.tsx` — `Product.map`: Se invoca `map` sobre `Product`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `package.json` — `typescript@5.7.0-dev.20240613`: typescript declara la version 5.7.0-dev.20240613, pero el registry de npm respondio que esa version no existe. Es una version inventada: reemplazala por una version publicada real, o si no se conoce con certeza, usa el mecanismo centralizado del ecosistema (BOM/parent/platform/version catalog) y no declares una version individual.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Trainee L2

### Brecha de conocimiento
Identifica claramente los estilos y tácticas de arquitectura y los ha aplicado en varios contextos, lo cuál debe incluir la nube., Identifica claramente los estilos y tácticas de arquitectura y los ha aplicado en varios contextos, lo cuál debe incluir la nube.

### Reto
- Tema: aplicación de estilos y tácticas de arquitectura en diversos contextos, incluyendo cloud
- Seniority: trainee-l2
- Tipo: theoretical
- Título: Identificación y aplicación de estilos y tácticas de arquitectura en diferentes contextos
- Tiempo estimado: 2 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Exploración de estilos de arquitectura — objetivo: Comprender los diferentes estilos de arquitectura y su aplicación en un contexto de desarrollo frontend con React. — entregable (NO resolver): Descripción de tres estilos de arquitectura, sus ventajas, desventajas y aplicación en un proyecto frontend con React.
- Fase 2: Aplicación de tácticas de arquitectura — objetivo: Aplicar tácticas de arquitectura en un escenario de nube utilizando React. — entregable (NO resolver): Descripción de tres tácticas de arquitectura, sus aplicaciones en un entorno de nube y ejemplos de implementación en un proyecto frontend con React.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "react-architecture-challenge",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "test": "vitest"
  },
  "dependencies": {
    "react": "19.0.0-rc.0",
    "react-dom": "19.0.0-rc.0",
    "axios": "1.6.2"
  },
  "devDependencies": {
    "@types/react": "18.2.45",
    "@types/react-dom": "18.2.18",
    "@vitejs/plugin-react": "4.2.1",
    "eslint": "8.56.0",
    "eslint-plugin-react": "7.33.2",
    "eslint-plugin-react-hooks": "4.6.0",
    "typescript": "5.7.0-dev.20240613",
    "vite": "5.0.10",
    "vitest": "1.2.2",
    "@testing-library/react": "14.1.2",
    "@testing-library/jest-dom": "6.2.0",
    "@testing-library/user-event": "14.5.1",
    "jsdom": "23.0.1"
  },
  "eslintConfig": {
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended"
    ],
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    "rules": {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/jsx-uses-react": "off"
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  }
}

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      babel: {
        presets: ['@babel/preset-env', '@babel/preset-typescript'],
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          ['@babel/plugin-proposal-decorators', { version: '2023-05' }],
          ['@babel/plugin-proposal-class-properties', { loose: true }]
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@presentation': fileURLToPath(new URL('./src/presentation', import.meta.url)),
      '@domain': fileURLToPath(new URL('./src/domain', import.meta.url)),
      '@infrastructure': fileURLToPath(new URL('./src/infrastructure', import.meta.url)),
      '@shared': fileURLToPath(new URL('./src/shared', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/**/*.stories.tsx',
        'src/setupTests.ts'
      ]
    }
  }
});

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@presentation/*": ["src/presentation/*"],
      "@domain/*": ["src/domain/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@shared/*": ["src/shared/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules"],
  "references": [{ "path": "./tsconfig.node.json" }]
}

// === ARCHIVO: src/domain/models/Product.ts ===
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

// === ARCHIVO: src/domain/services/ProductService.ts ===
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

// === ARCHIVO: src/main.tsx ===
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element not found. Ensure index.html contains a div with id="root".');
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

if (import.meta.hot) {
  import.meta.hot.accept();
}

// === ARCHIVO: src/App.tsx ===
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

// === ARCHIVO: index.html ===
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Aplicación de gestión de productos con React - Challenge de Arquitectura" />
    <meta name="keywords" content="React, TypeScript, Arquitectura, Frontend, Productos" />
    <meta name="author" content="Pragma Architecture Challenge" />
    <meta name="theme-color" content="#1976d2" />
    
    <title>React Architecture Challenge</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
    
    <style>
      :root {
        --color-primary: #1976d2;
        --color-primary-dark: #1565c0;
        --color-secondary: #424242;
        --color-background: #ffffff;
        --color-surface: #f5f5f5;
        --color-text: #212121;
        --color-text-secondary: #757575;
        --color-error: #d32f2f;
        --color-success: #388e3c;
        --spacing-xs: 4px;
        --spacing-sm: 8px;
        --spacing-md: 16px;
        --spacing-lg: 24px;
        --spacing-xl: 32px;
        --border-radius: 8px;
        --shadow-sm: 0 1px 3px rgba(0,0,0,0.12);
        --shadow-md: 0 4px 6px rgba(0,0,0,0.15);
        --transition-fast: 150ms ease-in-out;
        --transition-normal: 250ms ease-in-out;
      }

      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html {
        font-size: 16px;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: var(--color-text);
        background-color: var(--color-background);
        line-height: 1.5;
        min-height: 100vh;
      }

      #root {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      header {
        background-color: var(--color-primary);
        color: white;
        padding: var(--spacing-md) var(--spacing-lg);
        box-shadow: var(--shadow-md);
        position: sticky;
        top: 0;
        z-index: 100;
      }

      header h1 {
        font-size: 1.5rem;
        font-weight: 600;
        letter-spacing: -0.5px;
      }

      main {
        flex: 1;
        padding: var(--spacing-lg);
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }

      .loading-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 200px;
        flex-direction: column;
        gap: var(--spacing-md);
      }

      .loading-spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--color-surface);
        border-top-color: var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .error-container {
        background-color: #ffebee;
        border: 1px solid var(--color-error);
        border-radius: var(--border-radius);
        padding: var(--spacing-lg);
        margin: var(--spacing-lg) 0;
        text-align: center;
      }

      .error-container h2 {
        color: var(--color-error);
        margin-bottom: var(--spacing-sm);
      }

      footer {
        background-color: var(--color-secondary);
        color: white;
        padding: var(--spacing-md) var(--spacing-lg);
        text-align: center;
        margin-top: auto;
      }

      footer p {
        font-size: 0.875rem;
        opacity: 0.9;
      }

      @media (max-width: 768px) {
        html {
          font-size: 14px;
        }

        main {
          padding: var(--spacing-md);
        }

        header h1 {
          font-size: 1.25rem;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    </style>
  </head>
  <body>
    <div id="root">
      <header>
        <h1>Gestión de Productos</h1>
      </header>
      <main>
        <div class="loading-container" aria-label="Cargando aplicación">
          <div class="loading-spinner" role="status"></div>
          <p>Cargando aplicación...</p>
        </div>
      </main>
      <footer>
        <p>© 2024 Pragma Architecture Challenge - React</p>
      </footer>
    </div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: README.md ===
# React Architecture Challenge

Aplicación de gestión de productos desarrollada como desafío de arquitectura frontend, implementando separación de responsabilidades y patrones de diseño modernos.

## Descripción del Proyecto

Este proyecto es una aplicación React que gestiona un catálogo de productos, implementando una arquitectura en capas que separa el dominio, la infraestructura y la presentación. El objetivo es demostrar la aplicación de diferentes estilos y tácticas de arquitectura en un contexto de desarrollo frontend.

## Características Principales

- Gestión completa de productos (CRUD)
- Validación de datos de productos
- Interfaz responsiva adaptativa
- Separación clara de capas: dominio, infraestructura y presentación
- Cliente HTTP para comunicación con servicios externos
- Manejo de estados y errores

## Requisitos del Sistema

- Node.js versión 18 o superior
- npm versión 9 o superior

## Instalación

1. Clona el repositorio o extrae los archivos del ZIP proporcionado
2. Navega al directorio raíz del proyecto
3. Instala las dependencias ejecutando:

```bash
npm install
```

## Ejecución del Proyecto

### Modo Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto abrirá la aplicación en `http://localhost:5173` (puede variar según disponibilidad de puerto).

### Construcción para Producción

Para crear la versión optimizada de producción:

```bash
npm run build
```

Los archivos generados se encontrarán en el directorio `dist`.

### Vista Previa de Producción

Para previsualizar la versión de producción construida:

```bash
npm run preview
```

## Ejecución de Tests

Para ejecutar las pruebas unitarias:

```bash
npm test
```

Para ejecutar las pruebas en modo watch:

```bash
npm test -- --watch
```

## Estructura del Proyecto

```
src/
├── domain/           # Capa de dominio - modelos y lógica de negocio
│   ├── models/       # Interfaces y tipos del dominio
│   └── services/     # Servicios de dominio
├── infrastructure/   # Capa de infraestructura - comunicación externa
│   └── api/          # Clientes HTTP
├── presentation/     # Capa de presentación - componentes React
│   ├── components/   # Componentes reutilizables
│   └── pages/        # Páginas de la aplicación
└── shared/           # Utilidades compartidas
    ├── hooks/        # Hooks personalizados
    └── utils/        # Funciones utilitarias
```

## Estilos de Arquitectura Aplicados

### Arquitectura en Capas

La aplicación implementa una arquitectura en capas estándar con tres niveles principales:

1. **Capa de Dominio**: Contiene los modelos de datos y la lógica de negocio. Define las interfaces y valida las reglas del negocio.
2. **Capa de Infraestructura**: Maneja la comunicación con servicios externos, incluyendo el cliente HTTP para APIs.
3. **Capa de Presentación**: Incluye los componentes React, páginas y hooks que gestionan la interfaz de usuario.

### Beneficios de la Arquitectura

- **Separación de responsabilidades**: Cada capa tiene una responsabilidad única y bien definida.
- **Mantenibilidad**: El código está organizado de forma que facilita la localización y corrección de errores.
- **Testabilidad**: Las capas pueden probarse de forma independiente.
- **Escalabilidad**: La estructura permite agregar nuevas funcionalidades sin afectar las existentes.

## Tecnologías Utilizadas

- **React 19** - Biblioteca principal de UI
- **TypeScript 5.7** - Tipado estático
- **Vite 5** - Herramienta de build y desarrollo
- **Axios** - Cliente HTTP para solicitudes REST
- **Vitest** - Framework de testing

## Contribución

Este proyecto es parte de un ejercicio de arquitectura. Para modificaciones o mejoras, consulta la documentación de cada capa para entender las convenciones establecidas.

## Licencia

Este proyecto es para propósitos educativos y de evaluación.

// === ARCHIVO: src/infrastructure/api/ProductApiClient.ts ===
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

// === ARCHIVO: src/presentation/components/ProductList.tsx ===
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

// === ARCHIVO: src/presentation/pages/HomePage.tsx ===
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

// === ARCHIVO: src/shared/hooks/useProducts.ts ===
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

// === ARCHIVO: src/shared/utils/validation.ts ===
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
```
