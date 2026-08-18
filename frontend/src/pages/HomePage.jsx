import { useState, useEffect } from 'react'
import { getAllProperties } from '../services/propertyService'
import { Link } from 'react-router-dom'

function HomePage() {
    const [properties, setProperties] = useState([])

    useEffect(() => {
        getAllProperties()
            .then((data) => setProperties(data))
            .catch((err) => console.error(err))
    }, [])

    return (
        <div>
            <h1>Real Estate Marketplace</h1>
            {properties.map((property) => (
                <div key={property.id}>
                    <Link to={`/property/${property.id}`}>
                        <h3>{property.title}</h3>
                    </Link>
                    <p>{property.location} - ₹{property.price}</p>
                </div>
            ))}
        </div>
    )
}

export default HomePage