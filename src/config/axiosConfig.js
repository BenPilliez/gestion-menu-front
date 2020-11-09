import axios from "axios"

export const axiosInstance = axios.create({
    baseUrl: process.env.REACT_APP_BASE_URL
})

export const setAuthorization = (token) => {

    if (token) {
        console.debug("On ajoute le token dans le header de la requête")
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        console.debug("On ajoute le token dans le header de la requête")
        delete axios.defaults.headers.common['Authorization']
    }
}
