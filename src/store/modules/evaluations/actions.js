import axios from 'axios'
import { TOKEN_NAME } from '@/configs/api'

export default {
   // eslint-disable-next-line no-empty-pattern
   setEvaluationOrder ({}, params) {
      const token = localStorage.getItem(TOKEN_NAME)

      // eslint-disable-next-line prefer-promise-reject-errors
      if (!token) Promise.reject()

      return axios.post(`/auth/order/${params.identify}/evaluation`, params, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      })
   }
}
