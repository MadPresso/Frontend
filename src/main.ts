import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueRouter from 'vue-router'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/bulmaswatch.min.css'

Vue.config.productionTip = false

Vue.use(Buefy)

import MachineConfig from './components/MachineConfig.vue';
import Status from './components/Status.vue';
import NetworkConfig from './components/NetworkConfig.vue';

const routes = [
  { path: '/', component: Status },
  { path: '/settings/machine', component: MachineConfig },
  { path: '/settings/network', component: NetworkConfig }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
