import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMovieById, clearCurrentMovie } from '../store/slices/movieSlices.js'
import StarRating from '../components/ui/StarRating.jsx'
import Badge from '../components/ui/Badge.jsx'
import ActorCard from '../components/ui/ActorCard.jsx'
import ReviewSection from '../features/reviews/ReviewSection.jsx'
import Spinner from '../components/ui/Spinner.jsx'

function MovieDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentMovie: movie, loading, error } = useSelector((state) => state.movies)

  useEffect(() => {
    dispatch(fetchMovieById(id))
    return () => dispatch(clearCurrentMovie())
  }, [dispatch, id])

  if (loading) return <Spinner />
  if (error) return <p className="text-red-400 text-center mt-20">{error}</p>
  if (!movie) return null

  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full md:w-72 h-96 object-cover rounded-xl flex-shrink-0"
          />
        ) : (
          <div className="w-full md:w-72 h-96 bg-card rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-6xl">🎬</span>
          </div>
        )}

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white mb-2">{movie.title}</h1>
          <p className="text-muted mb-4">
            {movie.releaseYear} • {movie.duration} min • {movie.language}
          </p>
          <StarRating rating={movie.averageRating} />
          <p className="text-muted text-sm mt-1">{movie.totalReviews} reviews</p>

          <div className="flex gap-2 flex-wrap my-4">
            {movie.genres?.map((g) => <Badge key={g._id} text={g.name} />)}
          </div>

          <p className="text-gray-300 leading-relaxed mb-4">{movie.description}</p>
          {movie.director && (
            <p className="text-muted text-sm">
              Directed by <span className="text-white">{movie.director}</span>
            </p>
          )}
        </div>
      </div>

      {movie.cast?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.cast.map((c) => (
              <div key={c._id}>
                <ActorCard actor={c.actor} />
                {c.characterName && (
                  <p className="text-muted text-xs text-center mt-1">as {c.characterName}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <ReviewSection movieId={id} />
    </div>
  )
}
export default MovieDetailsPage