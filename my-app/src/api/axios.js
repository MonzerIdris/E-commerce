import axios from 'axios'

let BASE_URL = window.location.origin;

if (BASE_URL == "http://localhost:3000" ) BASE_URL = "http://localhost:5000/api"

console.log(BASE_URL)
export default axios.create({
    baseURL: BASE_URL,

})