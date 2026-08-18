import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById, updateProperty } from '../services/propertyService'

function EditPropertyPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Residential')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getPropertyById(id).then((data) => {
      setTitle(data.title)
      setDescription(data.description)
      setPrice(data.price)
      setCategory(data.category)
      setLocation(data.location)
    })
  }, [id])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await updateProperty(id, { title, description, price, category, location })
      navigate(`/property/${id}`)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div>
      <h1>Edit Property</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="Plot/Land">Plot/Land</option>
          <option value="Farmhouse">Farmhouse</option>
          <option value="Rental">Rental</option>
          <option value="Luxury">Luxury</option>
        </select>
        <br />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        <br />
        <button type="submit">Update Property</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default EditPropertyPage