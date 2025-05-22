import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite conexiones desde cualquier IP
    port: 5174,     //  puerto del servidor 

    allowedHosts: [
      'localhost',
      '127.0.0.1',]
  },
})