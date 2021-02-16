import VueRouter from 'vue-router';
import Vue from 'vue'
import App from './App.vue'
import {routes} from './routes';

Vue.use(VueRouter);

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
