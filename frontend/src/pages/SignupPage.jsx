import { useState } from 'react'
import { signup } from '../services/authService'
import { formStyles as styles } from '../formStyles'

function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await signup(name, email, password)
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.heading}>Signup</h1>
        <input style={styles.input} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button style={styles.button} type="submit">Signup</button>
        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>Signup successful! Ab login karein.</p>}
      </form>
    </div>
  )
}

export default SignupPage