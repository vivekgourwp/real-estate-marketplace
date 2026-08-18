import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getPropertyById, deleteProperty } from '../services/propertyService'
import Loader from '../components/Loader'

function PropertyDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [property, setProperty] = useState(null)

  useEffect(() => {
    getPropertyById(id).then(setProperty).catch(console.error)
  }, [id])

  const user = JSON.parse(localStorage.getItem('user'))
  const isOwner = user && property && user.id === property.userId

  async function handleDelete() {
    if (window.confirm('Are you sure you want to delete this property?')) {
      await deleteProperty(id)
      navigate('/')
    }
  }

if (!property) return <Loader />
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <span style={styles.category}>{property.category}</span>
        <h1 style={styles.title}>{property.title}</h1>
        <p style={styles.location}>📍 {property.location}</p>
        <p style={styles.price}>₹{property.price.toLocaleString('en-IN')}</p>
        <p style={styles.description}>{property.description}</p>
        <p style={styles.owner}>Listed by {property.owner.name}</p>

        {isOwner && (
          <div style={styles.actions}>
            <Link to={`/edit-property/${id}`} style={styles.editBtn}>Edit</Link>
            <button onClick={handleDelete} style={styles.deleteBtn}>Delete</button>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: { padding: '32px', display: 'flex', justifyContent: 'center' },
  card: { backgroundColor: '#fff', borderRadius: '10px', padding: '32px', maxWidth: '600px', width: '100%', boxShadow: '0 2px 6px rgba(0,0,0,0.08)' },
  category: { display: 'inline-block', fontSize: '12px', backgroundColor: '#dbeafe', color: '#2563eb', padding: '3px 10px', borderRadius: '20px', marginBottom: '12px' },
  title: { fontSize: '24px', marginBottom: '8px', color: '#111' },
  location: { fontSize: '15px', color: '#666', marginBottom: '8px' },
  price: { fontSize: '20px', fontWeight: 'bold', color: '#16a34a', marginBottom: '16px' },
  description: { fontSize: '15px', color: '#333', lineHeight: '1.6', marginBottom: '16px' },
  owner: { fontSize: '14px', color: '#888', marginBottom: '20px' },
  actions: { display: 'flex', gap: '12px' },
  editBtn: { padding: '8px 20px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '6px', fontWeight: '500' },
  deleteBtn: { padding: '8px 20px', backgroundColor: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' },
}

export default PropertyDetailPage