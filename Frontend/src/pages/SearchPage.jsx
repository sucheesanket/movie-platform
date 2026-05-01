// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { searchMovies, clearSearchResults } from '../store/slices/movieSlices.js'
// import MovieCard from '../components/ui/MovieCard.jsx'
// import Spinner from '../components/ui/Spinner.jsx'


import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchMovies, clearSearchResults } from '../store/slices/movieSlices.js'
import omdbService from '../services/omdbService.js'
import MovieCard from '../components/ui/MovieCard.jsx'
import Spinner from '../components/ui/Spinner.jsx'
import useAuth from '../hooks/useAuth.js'

function SearchPage() {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('local')
  const [omdbResults, setOmdbResults] = useState([])
  const [omdbLoading, setOmdbLoading] = useState(false)
  const [importing, setImporting] = useState(null)
  const [importMsg, setImportMsg] = useState('')

  const dispatch = useDispatch()
  const { searchResults, searchLoading } = useSelector((s) => s.movies)
  const { isAdmin } = useAuth()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return
    setImportMsg('')

    if (activeTab === 'local') {
      dispatch(searchMovies(query.trim()))
    } else {
      setOmdbLoading(true)
      setOmdbResults([])
      try {
        const res = await omdbService.search(query.trim())
        setOmdbResults(res.data.data)
      } catch {
        setOmdbResults([])
      } finally {
        setOmdbLoading(false)
      }
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setImportMsg('')
    dispatch(clearSearchResults())
    setOmdbResults([])
  }

  const handleImport = async (imdbId, title) => {
    setImporting(imdbId)
    setImportMsg('')
    try {
      await omdbService.import(imdbId)
      setImportMsg(`"${title}" imported successfully!`)
      setOmdbResults((prev) => prev.filter((m) => m.imdbId !== imdbId))
    } catch (err) {
      setImportMsg(err.response?.data?.message || 'Import failed')
    } finally {
      setImporting(null)
    }
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold text-white mb-6">Search Movies</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => handleTabChange('local')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'local'
              ? 'bg-primary text-white'
              : 'bg-card text-muted hover:text-white'
          }`}
        >
          Our Database
        </button>
        <button
          onClick={() => handleTabChange('omdb')}
          className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'omdb'
              ? 'bg-primary text-white'
              : 'bg-card text-muted hover:text-white'
          }`}
        >
          Search OMDB
        </button>
      </div>

      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            activeTab === 'local'
              ? 'Search our database...'
              : 'Search any movie from OMDB...'
          }
          className="flex-1 bg-card text-white rounded-xl px-5 py-3 outline-none focus:ring-2 focus:ring-primary text-sm"
        />
        <button
          type="submit"
          className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-medium"
        >
          Search
        </button>
      </form>

      {/* Import message */}
      {importMsg && (
        <div className={`rounded-lg px-4 py-3 mb-6 text-sm ${
          importMsg.includes('successfully')
            ? 'bg-green-900/30 border border-green-700 text-green-400'
            : 'bg-red-900/30 border border-red-700 text-red-400'
        }`}>
          {importMsg}
        </div>
      )}

      {/* Local results */}
      {activeTab === 'local' && (
        <>
          {searchLoading && <Spinner />}
          {!searchLoading && searchResults.length === 0 && query && (
            <p className="text-muted text-center py-10">
              No results found for "{query}"
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </>
      )}

      {/* OMDB results */}
      {activeTab === 'omdb' && (
        <>
          {omdbLoading && <Spinner />}
          {!omdbLoading && omdbResults.length === 0 && query && (
            <p className="text-muted text-center py-10">
              No results found for "{query}" on OMDB
            </p>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {omdbResults.map((movie) => (
              <div key={movie.imdbId} className="bg-card rounded-xl overflow-hidden">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-64 object-cover"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                    <span className="text-4xl">🎬</span>
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-white font-semibold truncate">{movie.title}</h3>
                  <p className="text-muted text-sm mb-3">{movie.releaseYear}</p>

                  {isAdmin ? (
                    <button
                      onClick={() => handleImport(movie.imdbId, movie.title)}
                      disabled={importing === movie.imdbId}
                      className="w-full bg-primary text-white py-2 rounded-lg text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {importing === movie.imdbId ? 'Importing...' : 'Import to Platform'}
                    </button>
                  ) : (
                    <p className="text-muted text-xs text-center">
                      Login as admin to import
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchPage
