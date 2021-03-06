import Vue from 'vue'
import DefaultTemplate from './layouts/Default'
import router from './router'
import store from './store'
require('./bootstrap')
require('./plugins')

Vue.config.productionTip = false

new Vue({
   router,
   store,
   render: h => h(DefaultTemplate)
}).$mount('#app')

store.dispatch('getMe')
