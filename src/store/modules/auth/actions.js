import axios from 'axios'
import { URI_BASE_API, TOKEN_NAME } from '@/configs/api'

// Criei essa instância pq as rotas que retornam o TOKEN as info do USER e LOGOUT não precisam de prefixo na API.
const instance = axios.create({
   baseURL: `${URI_BASE_API}`
})

export default {
   register ({ commit }, params) {
      return axios.post('/register', params)
   },

   login ({ commit, dispatch }, params) {
      return instance.post('/sanctum/token', params)
         .then((response) => {
            const token = response.data.token
            localStorage.setItem(TOKEN_NAME, token)

            dispatch('getMe')
         })
   },

   getMe ({ commit }) {
      const token = localStorage.getItem(TOKEN_NAME)

      if (!token) return

      instance.get('/auth/me', {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then((response) => {
         commit('SET_ME', response.data.data)
      }).catch(() => localStorage.removeItem(TOKEN_NAME))
   },

   logout ({ commit }) {
      const token = localStorage.getItem(TOKEN_NAME)

      if (!token) return

      instance.post('/auth/logout', {}, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      }).then((response) => {
         commit('LOGOUT', response.data.data)
         localStorage.removeItem(TOKEN_NAME)
      })
   }
}
