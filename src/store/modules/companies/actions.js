import axios from 'axios'

const RESOURCE = '/tenants'

export default {
   getCompanies ({ commit }) {
      return axios.get(`${RESOURCE}`)
         .then(response => commit('SET_COMPANY', response.data))
   }
}
