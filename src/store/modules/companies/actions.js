import axios from 'axios'

export default {
   getCompanies ({ commit }) {
      commit('SET_PRELOADER', true)
      commit('SET_TEXT_PRELOADER', 'Carregando as empresas')

      return axios.get('/tenants')
         .then(response => commit('SET_COMPANIES', response.data))
         .finally(() => commit('SET_PRELOADER', false))
   },

   getCategoriesByCompany ({ commit }, tokenCompany) {
      commit('SET_PRELOADER', true)
      commit('SET_TEXT_PRELOADER', 'Carregando as categorias')

      return axios.get('/categories', { params: { token_company: tokenCompany } })
         .then(response => commit('SET_CATEGORIES_COMPANY', response.data))
         .finally(() => commit('SET_PRELOADER', false))
   },

   getProductsByCompany ({ commit }, params) {
      return axios.get('/products', { params })
         .then(response => commit('SET_PRODUCTS_COMPANY', response.data))
   }
}
