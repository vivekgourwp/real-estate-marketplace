import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Navbar from './components/Navbar'
import AddPropertyPage from './pages/AddPropertyPage'
import ProtectedRoute from './components/ProtectedRoute'
import PropertyDetailPage from './pages/PropertyDetailPage'
import EditPropertyPage from './pages/EditPropertyPage'


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route
          path="/add-property"
          element={
            <ProtectedRoute>
              <AddPropertyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-property/:id"
          element={
            <ProtectedRoute>
              <EditPropertyPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App