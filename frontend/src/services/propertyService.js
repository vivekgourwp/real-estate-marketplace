import axios from 'axios'

const API_URL = 'http://localhost:5000/api/properties'

export async function getAllProperties() {
  const response = await axios.get(API_URL)
  return response.data
}