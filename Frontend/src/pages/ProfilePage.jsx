import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchMe, removeFromWatchlist } from '../store/Slices/authSlices.js'
import useAuth from '../hooks/useAuth.js'
import MovieCard from '../components/ui/MovieCard.jsx'
import Spinner from '../components/ui/Spinner.jsx'

function ProfilePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isLoggedIn, loading } = useAuth()

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return }
    dispatch(fetchMe())
  }, [dispatch, isLoggedIn, navigate])

  const handleRemove = (movieId) => {
    dispatch(removeFromWatchlist(movieId))
  }

  if (loading) return <Spinner />

  return (
    <div className="py-8">
      <div className="bg-card rounded-2xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-white mb-1">{user?.username}</h1>
        <p className="text-muted">{user?.email}</p>
        <span className="inline-block mt-2 bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
          {user?.role}
        </span>
      </div>

      <h2 className="text-2xl font-bold text-white mb-4">My Watchlist</h2>

      {!user?.watchlist?.length ? (
        <p className="text-muted text-center py-10">Your watchlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {user.watchlist.map((movie) => (
            <div key={movie._id} className="relative">
              <MovieCard movie={movie} />
              <button
                onClick={() => handleRemove(movie._id)}
                className="absolute top-2 right-2 bg-red-700 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default ProfilePage