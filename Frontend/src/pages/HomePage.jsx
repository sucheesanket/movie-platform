import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../store/Slices/movieSlices.js'

function HomePage() {
  const dispatch = useDispatch()
  const { movies, loading, error } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  if (loading) return <p className="text-center text-white mt-20">Loading...</p>
  if (error) return <p className="text-center text-red-500 mt-20">{error}</p>

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-white mb-6">All Movies</h1>
      <div className="grid grid-cols-3 gap-4">
        {movies.map(movie => (
          <div key={movie._id} className="bg-card p-4 rounded-lg">
            <h2 className="text-white font-semibold">{movie.title}</h2>
            <p className="text-muted text-sm">{movie.releaseYear}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage