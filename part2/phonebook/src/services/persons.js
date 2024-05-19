import axios from "axios";

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
    .then()
}

const removeById = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, removeById }