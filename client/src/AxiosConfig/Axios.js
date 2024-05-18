import axios from "axios";
const Axios = axios.create({
    baseURL: 'https://musicapp-9h7i.onrender.com',
    headers: {'Content-Type': 'application/json'},
 })
 export default Axios;