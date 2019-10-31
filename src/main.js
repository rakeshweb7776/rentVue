/* Importing Vue */
import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
//import VueResource from 'vue-resource'
import VueCookies from 'vue-cookies'
import swal from 'sweetalert';

import BootstrapVue from 'bootstrap-vue'

window.axios = axios;

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

/* Vue Use Code */
Vue.use(DashboardCss)
//Vue.use(VueResource)

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.config.productionTip = false

/* Load App */
new Vue({
  render: h => h(App),
  router
}).$mount('#app')




