import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPropertyById, updateProperty } from '../services/propertyService'
import { formStyles as styles } from '../formStyles'
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
      <div style={styles.container}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Edit Property</h1>
          <input style={styles.input} type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea style={styles.textarea} placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input style={styles.input} type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <select style={styles.input} value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Plot/Land">Plot/Land</option>
            <option value="Farmhouse">Farmhouse</option>
            <option value="Rental">Rental</option>
            <option value="Luxury">Luxury</option>
          </select>
          <input style={styles.input} type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
          <button style={styles.button} type="submit">Add Property</button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    )
}

export default EditPropertyPage