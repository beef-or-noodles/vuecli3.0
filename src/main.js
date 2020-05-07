import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import routes from './route'
Vue.use(Router)
import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);


Vue.config.productionTip = false
const router =  new Router({routes})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
