import {boot} from 'quasar/wrappers'
import axios from 'axios'

const api = axios.create({
   baseURL: 'http://localhost:5001/demo-sandbox/us-central1/api',
})

export default boot(({app}) => {
   app.provide('axios', api)
})

export {api as axios}
