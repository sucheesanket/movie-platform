import { Link } from 'react-router-dom'
import StarRating from './StarRating.jsx'
import Badge from './Badge.jsx'

function MovieCard({ movie }) {
  return (
    <Link to={`/movies/${movie._id}`}>
      <div className="bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
            <span className="text-muted text-4xl">🎬</span>
          </div>
        )}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg truncate">{movie.title}</h3>
          <p className="text-muted text-sm mb-2">{movie.releaseYear}</p>
          <StarRating rating={movie.averageRating} />
          <div className="flex gap-2 mt-3 flex-wrap">
            {movie.genres?.map((g) => (
              <Badge key={g._id} text={g.name} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}
export default MovieCard