import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

import { Quasar } from 'quasar'

import { Vx, getCurrentInstance } from './lib'



import ElementPlus from 'element-plus'
const app = createApp(App)

import Page from './Page.vue';

import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
    {
        path: "/",
        component: Page
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})


app.use(router);


app.use(Vx, {
    endpoint: "http://localhost:8001/api/"
});

app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})


app.use(ElementPlus)
app.mount('#app')