import axios from "axios";

const instance = axios.create({ baseURL: "http://localhost:3020/" })

export default instance;