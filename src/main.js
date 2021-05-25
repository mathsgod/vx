import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
Vue.use(VueResource);

import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';

import './assets/element-ui/theme/index.css';

Vue.use(ElementUI);


import A from './app';
Vue.use(A);


Vue.component("vue", () => import("./components/vue"))
Vue.component("vx-tabs", () => import("./components/vx-tabs"));
Vue.component("vx-tab", () => import("./components/vx-tab"));

Vue.component("vx-view", () => import("./components/vx-view"));
Vue.component("vx-view-item", () => import("./components/vx-view-item"));


Vue.component("vx-form", () => import("./components/vx-form"));


import RTable from "./r-table";
import RTableColumn from "./r-table-column";
import RTableDropdownItem from "./r-table-dropdown-item";
Vue.component("r-table", RTable);
Vue.component("r-table-column", RTableColumn);
Vue.component("r-table-dropdown-item", RTableDropdownItem);



Vue.config.productionTip = false

import VueRouter from 'vue-router'
Vue.use(VueRouter)
const routes = [
  { path: '*' },
];
const router = new VueRouter({
  mode: "history",
  routes // short for `routes: routes`
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



let init_vue = function (element) {
  var nodes = element.querySelectorAll("r-table, card, vue, vx-tabs, el-card");
  nodes.forEach(node => {
    new Vue({
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