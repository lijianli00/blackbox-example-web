import axios from 'axios'

axios.defaults.timeout = 30000
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
