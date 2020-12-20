import axios from 'axios'

const api = axios.create({
    baseURL: process.env?.APP_MANIFEST?.extra?.api,
    
})
export default api;
