import axios from 'axios'
import { TOKEN_NAME } from '@/configs/api'

export default {
   getMyOrders ({ commit }) {
      const token = localStorage.getItem(TOKEN_NAME)

      // eslint-disable-next-line prefer-promise-reject-errors
      if (!token) Promise.reject()

      return axios.get('/auth/my-orders', {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
         .then(response => commit('SET_ORDERS', response.data))
   },

   // eslint-disable-next-line no-empty-pattern
   getOrderByIdentify ({}, identify) {
      return axios.get(`/order/${identify}`)
   },

   async createOrderAnonymously ({ commit }, params) {
      const response = await axios.post('/order', params)
      commit('CLEAR_CART')
      return response.data.data
   },

   async createOrderAuthenticated ({ commit }, params) {
      const token = localStorage.getItem(TOKEN_NAME)

      const response = await axios.post('/auth/order', params, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
      commit('CLEAR_CART')
      return response.data.data
   }
}
