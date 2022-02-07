import axios from 'axios'
import { URI_BASE_API, API_VERSION } from '@/configs/api'

axios.defaults.baseURL = `${URI_BASE_API}/${API_VERSION}`
