import axios from 'axios'

let BASE_URL = window.location.origin;

if (BASE_URL === "http://localhost:3000/") BASE_URL = "http://localhost:5000/api";

else if (BASE_URL === "https://eshopp-heroku.herokuapp.com/") BASE_URL = "https://eshopp-heroku.herokuapp.com/";


export default axios.create({
    baseURL: BASE_URL,

})