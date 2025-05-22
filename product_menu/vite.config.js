import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
   server: {
      host: '0.0.0.0', // 👈 critical: allow LAN access
    port: 5173,
    proxy: {
      '/api': 'http://192.168.68.109',
     
    },
    
  },
})
// '/esp-api': {
//         target: 'http://192.168.68.129', // Your ESP32 IP
//         changeOrigin: true,
//         rewrite: path => path.replace(/^\/esp-api/, ''),
//       },