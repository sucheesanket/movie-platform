import { Link } from 'react-router-dom'

function ActorCard({ actor }) {
  return (
    <Link to={`/actors/${actor._id}`}>
      <div className="bg-card rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer text-center">
        {actor.photo ? (
          <img src={actor.photo} alt={actor.name} className="w-full h-48 object-cover" />
        ) : (
          <div className="w-full h-48 bg-gray-800 flex items-center justify-center">
            <span className="text-5xl text-muted">👤</span>
          </div>
        )}
        <div className="p-3">
          <h4 className="text-white font-medium">{actor.name}</h4>
          {actor.birthPlace && (
            <p className="text-muted text-xs mt-1">{actor.birthPlace}</p>
          )}
        </div>
      </div>
    </Link>
  )
}
export default ActorCard