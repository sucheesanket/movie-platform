import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovies, clearSearchResults } from '../store/slices/movieSlices.js'
import MovieCard from '../components/ui/MovieCard.jsx'
import Spinner from '../components/ui/Spinner.jsx'

function SearchPage() {
  const [query, setQuery] = useState('')
  const dispatch = useDispatch()
  const { searchResults, searchLoading } = useSelector((state) => state.movies)

  useEffect(() => {
    return () => dispatch(clearSearchResults())
  }, [dispatch])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) dispatch(searchMovies(query.trim()))
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Search Movies</h1>

      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or description..."
          className="flex-1 bg-card text-white rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium"
        >
          Search
        </button>
      </form>

      {searchLoading && <Spinner />}

      {!searchLoading && searchResults.length === 0 && query && (
        <p className="text-muted text-center py-10">No results found for "{query}"</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {searchResults.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
export default SearchPage