import Vue from 'vue'
import Vuex from 'vuex'

import { state, mutations } from '@/store/default'
import auth from '@/store/modules/auth'
import cart from '@/store/modules/cart'
import companies from '@/store/modules/companies'
import orders from '@/store/modules/orders'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      auth,
      cart,
      companies,
      orders
   },
   state,
   mutations
})
