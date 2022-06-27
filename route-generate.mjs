import fs from 'fs';
import { generateRoutes } from 'vue-route-generator'

const code = generateRoutes({
    importPrefix: "./pages/",
    pages: './src/pages'
})

fs.writeFileSync('./src/routes.js', code)