import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules:{
      localsConvention: 'camelCaseOnly' //convert kebab case to camel case in jsn imports for css modules
    }
  }
})
