import './style/index.css';

// Bootstrap
import './scss/bootstrap.scss';


import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-outlined/material-icons-outlined.css'
import '@quasar/extras/fontawesome-v6/fontawesome-v6.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import "./scss/quasar.scss";


import { Quasar } from 'quasar'

import { Vx, getCurrentInstance } from './lib'

import ElementPlus from 'element-plus'
const app = createApp(App)

import './scss/main.scss';

import IndexPage from './pages/index.vue';

import { createRouter, createWebHashHistory } from "vue-router";

import auto_routes from './routes';
const routes = [
    {
        path: "/",
        component: IndexPage
    },
    ...auto_routes
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

//i18n


import zhTW from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en';


import { createI18n } from 'vue-i18n'
const i18n = createI18n({
    globalInjection: true,
    locale: "en",
    messages: {
        en: en,
        "zh-hk": zhTW,
        "zh-tw": zhTW,
    }
});


app.use(i18n)


app.use(ElementPlus)
app.mount('#app')