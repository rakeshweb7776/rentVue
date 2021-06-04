/* Importing Vue */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import cookies from 'vue-cookies'
import swal from 'sweetalert';
import VueMask from 'v-mask'
import Vue2Filters from 'vue2-filters'
import BootstrapVue from 'bootstrap-vue'

window.axios = axios;
window.swal = swal;
window.$cookies = cookies;

/* app.js */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Dashboard plugin */
import DashboardCss from "./assets/scss/dashboard.scss";

/* Import Router */
import router from './routes/routes'

window.router = router;
window.swal = swal;
window.server_path = "https://codingkloud.com/rentVue/";

window.Vue = Vue;
window.VueMask = VueMask;
window.Vue2Filters = Vue2Filters;
/* Vue Use Code */
Vue.use(DashboardCss)

Vue.use(BootstrapVue)
Vue.use(cookies)
Vue.use(VueMask)
Vue.use(Vue2Filters)

Vue.config.productionTip = false

/* Load App */
new Vue({
  render: h => h(App),
  router  
}).$mount('#app')

/* ----- Uppercase Filter ----- */
Vue.filter("npm", function (value) {
  return value.toUpperCase();
});

/* ----- Capitalize Filter ----- */
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})







