import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useAuth from '../../hooks/useAuth.js'
import { logout } from '../../store/slices/authSlices.js'

function Navbar() {
  const { isLoggedIn, user } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-card border-b border-gray-800 px-6 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-primary text-2xl font-bold tracking-tight">
          CineInfo
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
            Search
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                {user?.username}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Navbar