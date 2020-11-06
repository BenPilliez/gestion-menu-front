import axios from "axios"

export const axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_BASE_URL
})

export const setAuthorization = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}
