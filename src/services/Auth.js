/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

//const baseUrl = "https://localhost:7083/api/authentication"
const baseUrl = "https://lmrestapi.azurewebsites.net/api/authentication"

const authenticate = (userForAuth) => {
    const request = axios.post(baseUrl, userForAuth)
    return request.then(response => response)
}

export default { authenticate }
