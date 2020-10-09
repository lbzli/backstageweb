import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import create from './components/Common/FuncComponent/create'
import router from './router/index'

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.prototype.$create = create

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
