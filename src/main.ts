
import { createApp } from 'vue'
import App from './App.vue'

import Vx from "@";
import "@";

const app = createApp(App)

import { createRouter, createWebHashHistory } from "vue-router";
import routes from './routes';
const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})
app.use(router);

app.use(Vx, {
    endpoint: "http://localhost:8001/api/"
});


app.mount('#app')