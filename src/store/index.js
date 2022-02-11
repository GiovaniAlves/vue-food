import Vue from 'vue'
import Vuex from 'vuex'

import { state, mutations } from '@/store/default'
import companies from '@/store/modules/companies'
import cart from '@/store/modules/cart'

Vue.use(Vuex)

export default new Vuex.Store({
   modules: {
      cart,
      companies
   },
   state,
   mutations
})
