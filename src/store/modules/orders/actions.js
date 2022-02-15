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
   }
}
