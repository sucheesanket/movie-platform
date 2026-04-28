import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovies } from '../store/slices/movieSlices.js'
import MovieCard from '../components/ui/MovieCard.jsx'
import Spinner from '../components/ui/Spinner.jsx'

function HomePage() {
  const dispatch = useDispatch()
  const { movies, loading, error, total } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">All Movies</h1>
        {total > 0 && <p className="text-muted mt-1">{total} movies found</p>}
      </div>

      {loading && <Spinner />}
      {error && <p className="text-red-400 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
export default HomePage