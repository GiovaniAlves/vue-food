import axios from 'axios'

export default {
   register ({ commit }, params) {
      return axios.post('/register', params)
   }
}
