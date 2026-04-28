import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchActorById, clearCurrentActor } from '../store/slices/actorSlices.js'
import Spinner from '../components/ui/Spinner.jsx'

function ActorDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentActor: actor, loading, error } = useSelector((state) => state.actors)

  useEffect(() => {
    dispatch(fetchActorById(id))
    return () => dispatch(clearCurrentActor())
  }, [dispatch, id])

  if (loading) return <Spinner />
  if (error) return <p className="text-red-400 text-center mt-20">{error}</p>
  if (!actor) return null

  return (
    <div className="py-8 max-w-2xl mx-auto">
      <div className="flex gap-8 items-start">
        {actor.photo ? (
          <img src={actor.photo} alt={actor.name} className="w-48 h-60 object-cover rounded-xl flex-shrink-0" />
        ) : (
          <div className="w-48 h-60 bg-card rounded-xl flex items-center justify-center flex-shrink-0">
            <span className="text-5xl">👤</span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{actor.name}</h1>
          {actor.birthDate && (
            <p className="text-muted text-sm mb-1">
              Born: {new Date(actor.birthDate).toLocaleDateString()}
            </p>
          )}
          {actor.birthPlace && (
            <p className="text-muted text-sm mb-4">{actor.birthPlace}</p>
          )}
          {actor.bio && (
            <p className="text-gray-300 leading-relaxed">{actor.bio}</p>
          )}
        </div>
      </div>
    </div>
  )
}
export default ActorDetailsPage