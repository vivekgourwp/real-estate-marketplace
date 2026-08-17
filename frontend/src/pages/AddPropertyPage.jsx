import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createProperty } from '../services/propertyService'

function AddPropertyPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Residential')
  const [location, setLocation] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      await createProperty({ title, description, price, category, location })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
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
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <br />
        <button type="submit">Add Property</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}

export default AddPropertyPage