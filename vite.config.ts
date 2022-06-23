const path = require('path')
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import typescript from '@rollup/plugin-typescript'
const resolvePath = (str: string) => path.resolve(__dirname, str)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.ts'),
      name: 'VX',
      fileName: (format) => `vx.${format}.js`
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [
        typescript(
          {
            sourceMap: false,
            'target': 'es2020',
            'rootDir': "src/lib",
            'declaration': true,

            declarationDir: "dist",


            exclude: resolvePath('../node_modules/**'),
            allowSyntheticDefaultImports: true
          }
        )
      ]
    }
  }
})
