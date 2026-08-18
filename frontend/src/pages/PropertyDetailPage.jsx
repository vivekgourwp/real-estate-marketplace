import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPropertyById, deleteProperty } from '../services/propertyService'

function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    getPropertyById(id)
      .then((data) => setProperty(data))
      .catch((err) => console.error(err))
  }, [id])

  const user = JSON.parse(localStorage.getItem('user'))
  const isOwner = user && property && user.id === property.userId

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(id)
      navigate('/')
    }
  }

  if (!property) return <p>Loading...</p>

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ₹{property.price}</p>
      <p>Category: {property.category}</p>
      <p>Location: {property.location}</p>
      <p>Owner: {property.owner.name}</p>

      {isOwner && (
        <>
          <Link to={`/edit-property/${id}`}>Edit</Link>
          {' | '}
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  )
}

export default PropertyDetailPage