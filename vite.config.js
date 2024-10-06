import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Permite el acceso tanto a la carpeta raíz del proyecto como a las fuentes de slick-carousel
      allow: [
        //'/Users/paulamaestri/apiFront',
        //'/Users/paulamaestri/apiFront/node_modules/slick-carousel/slick/fonts'
         //'C:/Users/Emma/Desktop/API FRONT/apiFront',
         //'C:/Users/Emma/Desktop/API FRONT/node_modules/slick-carousel/slick/fonts'
         'C:/Users/russo/API FRONT/apiFront',
         'C:/Users/russo/API FRONT/apiFront/node_modules/slick-carousel/slick/fonts'
      ]
    }
  }
})
