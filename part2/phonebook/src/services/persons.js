import axios from "axios";

const baseUrl = '/api/persons'

const edit = changedPerson => {
    return axios.put(`${baseUrl}/${changedPerson.id}`, changedPerson)
}

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const removeById = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, removeById, edit }