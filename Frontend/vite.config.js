import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',  // Directorio donde se colocarán los archivos del build
  },
  server: {
    // Configuración opcional para desarrollo local, ajusta según lo necesites
    port: 3000,
    open: true,  // Abre el navegador automáticamente al iniciar el servidor
  },
});
