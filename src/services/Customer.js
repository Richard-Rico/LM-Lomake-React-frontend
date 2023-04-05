/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const baseUrl = "https://localhost:7083/api/customers"
//const baseUrl = "https://nwbackendrr.azurewebsites.net/api/customers"

let token = null

// Tämä on metodi jota kutsutaan aina ennen kuin tehdään muu pyyntö serviceen
// Parametrina annetaan token joka otetaan local storagesta
const setToken = newToken => {
    token = `bearer ${newToken}`
}


const getAll = () => {
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.get(baseUrl, config)
    return request.then(response => response.data)
}


const create = newLomake => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.post(baseUrl, newLomake, config)
}


const remove = id => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.delete(`${baseUrl}/${id}`, config)
}

const update = (object) => {
    const config = {
        headers: { Authorization: token },
    }
    return axios.put(`${baseUrl}/${object.customerId}`, object, config)
}

export default { getAll, create, remove, update, setToken }