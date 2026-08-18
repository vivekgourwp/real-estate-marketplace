import axios from 'axios'

const API_URL = 'http://localhost:5000/api/properties'

export async function getAllProperties() {
  const response = await axios.get(API_URL)
  return response.data
}


export async function createProperty(propertyData) {
  const token = localStorage.getItem('token')
  const response = await axios.post(API_URL, propertyData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}


export async function getPropertyById(id) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}
