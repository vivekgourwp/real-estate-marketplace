import axios from 'axios'

const API_URL = 'http://localhost:5000/api/properties'

export async function getAllProperties() {
  const response = await axios.get(API_URL)
  return response.data
}


export async function createProperty(propertyData) {
  const token = localStorage.getItem('token')

  const formData = new FormData()
  formData.append('title', propertyData.title)
  formData.append('description', propertyData.description)
  formData.append('price', propertyData.price)
  formData.append('category', propertyData.category)
  formData.append('location', propertyData.location)
  if (propertyData.image) {
    formData.append('image', propertyData.image)
  }

  const response = await axios.post(API_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data
}


export async function getPropertyById(id) {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}



export async function updateProperty(id, propertyData) {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${API_URL}/${id}`, propertyData, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export async function deleteProperty(id) {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}