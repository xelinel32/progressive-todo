import Vue from "vue";
import App from "./App.vue";
import http from "./axiosConfig";
import "materialize-css/dist/js/materialize";
import "materialize-css/dist/css/materialize.min.css";

import router from "./router";
import store from "./store";

import Loading from "@/components/Loading";
Vue.component("Loading", Loading);

import VuePaginate from "vuejs-paginate";
Vue.component("vue-paginate", VuePaginate);

import VuePageTransition from "vue-page-transition";
Vue.use(VuePageTransition);

import messagePlugin from "@/modules/messagePlugin";
Vue.use(messagePlugin);

import tooltipPlugin from "@/modules/tooltipPlugin";
Vue.directive("tooltip", tooltipPlugin);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
