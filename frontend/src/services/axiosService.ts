import axios from "axios";

import {baseURL} from "../constants";

const axiosService = axios.create({baseURL})

axiosService.interceptors.request.use(request => {
    const token = "dlkjsalkd"
    if (token) {
        request.headers.Authorization = `Bearer ${token}`
    }
    return request
})

export {
    axiosService
}