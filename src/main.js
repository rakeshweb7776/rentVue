/* Importing Vue */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import swal from 'sweetalert';
import VueMask from 'v-mask'


import BootstrapVue from 'bootstrap-vue'

window.axios = axios;
window.swal = swal;

Vue.prototype.$axios = axios;

/* app.js */
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* Dashboard plugin */
import DashboardCss from "./assets/scss/dashboard.scss";

/* Import Router */
import router from './routes/routes'

window.router = router;
window.swal = swal;

window.Vue = Vue;
window.VueMask = VueMask;

/* Vue Use Code */
Vue.use(DashboardCss)
//Vue.use(VueResource)

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)
Vue.use(VueMask);

Vue.config.productionTip = false

/* Load App */
new Vue({
  render: h => h(App),
  router  
}).$mount('#app')

/* ----- Uppercase Filter ----- */
Vue.filter("uppercase", function (value) {
  return value.toUpperCase();
});

/* ----- Capitalize Filter ----- */
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})





