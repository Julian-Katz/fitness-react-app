import axios from "axios";

const instance = axios.create({ 
    baseURL: "http://localhost:3015/",
    withCredentials: true
})



export default instance;