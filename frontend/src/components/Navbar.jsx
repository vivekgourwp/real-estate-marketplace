import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <nav>
      <Link to="/">Home</Link>
      {' | '}
      {token ? (
        <>
          <Link to="/add-property">Add Property</Link>
          {' | '}
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {' | '}
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  )
}

export default Navbar