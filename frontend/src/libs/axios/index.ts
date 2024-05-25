import axios from "axios"

const privateApi = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:8080",
})


export default privateApi