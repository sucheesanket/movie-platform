import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { register } from '../store/Slices/authSlices.js'
import useAuth from '../hooks/useAuth.js'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoggedIn, loading } = useAuth()

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await dispatch(registerUser({ username, email, password })).unwrap()
      navigate('/')
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-white mb-2">Create account</h1>
        <p className="text-muted mb-8">Join CineInfo today</p>

        {error && (
          <div className="bg-red-900/30 border border-red-700 text-red-400 rounded-lg px-4 py-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-muted text-sm block mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="yourname"
            />
          </div>
          <div>
            <label className="text-muted text-sm block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="text-muted text-sm block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
              placeholder="min 6 characters"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-muted text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
export default RegisterPage