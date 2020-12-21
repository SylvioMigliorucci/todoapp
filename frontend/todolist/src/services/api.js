import axios from 'axios'
import { baseURL } from '../util';

const apiInstance = axios.create({
    baseURL,
    timeout: 60000
    
})
export default apiInstance;
