import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProperties } from '../services/propertyService'
import Loader from '../components/Loader'

function HomePage() {
  const [properties, setProperties] = useState([])
const [loading, setLoading] = useState(true)
  useEffect(() => {
    getAllProperties()
      .then((data) => setProperties(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Explore Properties</h1>
      <div style={styles.grid}>
        {properties.map((property) => (
          <Link to={`/property/${property.id}`} key={property.id} style={styles.card} className="property-card">
            <span style={styles.category}>{property.category}</span>
            <h3 style={styles.title}>{property.title}</h3>
            <p style={styles.location}>📍 {property.location}</p>
            <p style={styles.price}>₹{property.price.toLocaleString('en-IN')}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '32px',
  },
  heading: {
    marginBottom: '24px',
    color: '#111',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    display: 'block',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '18px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    transition: 'transform 0.15s',
  },
  category: {
    display: 'inline-block',
    fontSize: '12px',
    backgroundColor: '#dbeafe',
    color: '#2563eb',
    padding: '3px 10px',
    borderRadius: '20px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '17px',
    marginBottom: '6px',
    color: '#111',
  },
  location: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  price: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#16a34a',
  },
}

export default HomePage