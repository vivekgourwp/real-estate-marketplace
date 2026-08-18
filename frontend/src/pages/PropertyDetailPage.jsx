import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getPropertyById } from '../services/propertyService'

function PropertyDetailPage() {
  const { id } = useParams()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    getPropertyById(id)
      .then((data) => setProperty(data))
      .catch((err) => console.error(err))
  }, [id])

  if (!property) return <p>Loading...</p>

  return (
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <p>Price: ₹{property.price}</p>
      <p>Category: {property.category}</p>
      <p>Location: {property.location}</p>
      <p>Owner: {property.owner.name}</p>
    </div>
  )
}

export default PropertyDetailPage