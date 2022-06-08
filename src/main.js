import Vue from 'vue'
import App from './App.vue'

import "@fortawesome/fontawesome-free/css/all.css";

import "./assets/css/font.css";


import "./assets/css/bootstrap.min.css";
import "./assets/css/bootstrap-extended.min.css";
import "./assets/css/colors.min.css";
import "./assets/css/components.min.css";
import "./assets/css/themes/dark-layout.min.css";
import "./assets/css/themes/bordered-layout.min.css";
import "./assets/css/themes/semi-dark-layout.min.css";
import "./assets/css/core/menu/menu-types/vertical-menu.min.css";
import "./assets/vx.css"

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox.css";

window.Fancybox = Fancybox;

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component("apexchart", VueApexCharts);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en: enLocale,
    "zh-hk": zhTWLocale
  }
});
window.i18n = i18n;

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/element-ui/theme/index.css'
import './assets/element-ui-dark/theme/index.css'

import enLocale from 'element-ui/lib/locale/lang/en'
//import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN'
import zhTWLocale from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});


import HLForm from '@hostlink/hl-form';
Vue.use(HLForm);

import "vuesax/dist/vuesax.css"


import Vuesax from 'vuesax'
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: "#7367F0",
      success: '#28C76F',
      danger: '#EA5455',
      warning: '#FF9F43',
      dark: '#4B4B4B'
    }
  }
});

import 'material-icons/iconfont/material-icons.css';


import VX from './vx';
Vue.use(VX);




import ElImageViewer from "element-ui/packages/image/src/image-viewer";
Vue.component("el-image-viewer", ElImageViewer);


Vue.component("vx-input-xlsx", () => import("./components/vx-input-xlsx"));

Vue.component("jspreadsheet", () => import("./components/jspreadsheet"));

Vue.component("vx-div", () => import("./components/vx-div"));
Vue.component("vx-avatar-group", () => import("./components/vx-avatar-group"));
Vue.component("vx-avatar", () => import("./components/vx-avatar"));
Vue.component("vx-nav", () => import("./components/vx-nav"));
Vue.component("vx-nav-item", () => import("./components/vx-nav-item"));

Vue.component("vx-icon", () => import("./components/vx-icon"));
Vue.component("vx-button", () => import("./components/vx-button"));

Vue.component("vue", () => import("./components/vue"))
Vue.component("vx-tabs", () => import("./components/vx-tabs"));
Vue.component("vx-tab", () => import("./components/vx-tab"));

Vue.component("vx-table", () => import("./components/vx-table"));


Vue.component("vx-view", () => import("./components/vx-view"));
Vue.component("vx-view-item", () => import("./components/vx-view-item"));

Vue.component("vx-form", () => import("./components/vx-form"));
Vue.component("vx-card", () => import("./components/vx-card"));
Vue.component("vx-card-header", () => import("./components/vx-card-header"));
Vue.component("vx-card-body", () => import("./components/vx-card-body"));
Vue.component("vx-card-footer", () => import("./components/vx-card-footer"));

Vue.component("vx-form-table", () => import("./components/vx-form-table"));

Vue.component("vx-file-manager", () => import("./components/vx-file-manager"));
Vue.component("vx-file-input", () => import("./components/vx-file-input"));

import RTable from "./r-table";
import RTableColumn from "./r-table-column";
import RTableDropdownItem from "./r-table-dropdown-item";
Vue.component("r-table", RTable);
Vue.component("r-table-column", RTableColumn);
Vue.component("r-table-dropdown-item", RTableDropdownItem);


Vue.component("vx-tinymce", () => import("./components/vx-tinymce"));


Vue.component("vx-dialog-button", () => import("./components/vx-dialog-button"));

Vue.component("vx-dialog", () => import("./components/vx-dialog"));

Vue.config.productionTip = false

import PageLogin from "./pages/page-login";
import VxForgotPassword from './pages/page-forgot-password';
import VxApp from "./components/vx-app";
import VxTest from "./components/vx-test";
import PageResetPassword from "./pages/page-reset-password";

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueRouterReferer from '@tozd/vue-router-referer'
Vue.use(VueRouterReferer);


const routes = [
  {
    path: "/",
    component: PageLogin
  },
  {
    path: "/forgot_password",
    component: VxForgotPassword
  },
  {
    path: "/test",
    component: VxTest
  },
  {
    path: "/reset-password",
    component: PageResetPassword
  },
  {
    path: '/:module/:action',
    component: VxApp
  },
  {
    path: '/:module/:id/:action',
    component: VxApp
  },
  {
    path: '/:module',
    component: VxApp
  },
  {
    path: '*',
    component: VxApp
  },

];
const router = new VueRouter({
  mode: "history",
  routes // short for `routes: routes`
});

new Vue({
  router,
  i18n,
  render: h => h(App),
}).$mount('#app')



let init_vue = function (element) {
  var nodes = element.querySelectorAll("r-table, card, vue, vx-tabs, el-card, vx-card, vx-form, vx-form-table, vx-view, el-table, el-link, router-link, vx-table, el-menu, vx-dialog-button");
  nodes.forEach(node => {
    new Vue({
      i18n: i18n,
      router,
      el: node
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("content loaded");
  let observer = new MutationObserver(mutationList => {
    mutationList.forEach(record => {
      init_vue(record.target);
    });
  });
  observer.observe(document.body, { attributes: false, childList: true, subtree: true });
  init_vue(document);
});


window.Vue = Vue;