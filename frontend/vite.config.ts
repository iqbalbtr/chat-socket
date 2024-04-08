import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages')
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@libs',
        replacement: path.resolve(__dirname, 'src/libs')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: '@providers',
        replacement: path.resolve(__dirname, 'src/providers')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks')
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services')
      }, {
        find: '@contexts',
        replacement: path.resolve(__dirname, 'src/contexts')
      }
    ]
  }
})
