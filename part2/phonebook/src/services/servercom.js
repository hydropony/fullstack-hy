import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    return axios.get(baseUrl)
}

const getSpecific = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

const create = (person) => {
    return axios.post(baseUrl, person)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)    
}

const update = (person) => {
    return axios.put(`${baseUrl}/${person.id}`, person)
}

export default {
    get,
    create,
    deleteEntry,
    getSpecific,
    update
}