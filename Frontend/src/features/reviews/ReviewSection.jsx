import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchReviewsByMovie, createReviews, deleteReviews } from '../../store/slices/reviewSlices.js'
import useAuth from '../../hooks/useAuth.js'
import StarRating from '../../components/ui/StarRating.jsx'
import Spinner from '../../components/ui/Spinner.jsx'

function ReviewSection({ movieId }) {
  const dispatch = useDispatch()
  const { reviews, loading } = useSelector((state) => state.reviews)
  const { isLoggedIn, user } = useAuth()
  const [rating, setRating] = useState(7)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    dispatch(fetchReviewsByMovie(movieId))
  }, [dispatch, movieId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      await dispatch(createReview({ movieId, rating: Number(rating), comment })).unwrap()
      setComment('')
      setRating(7)
    } catch (err) {
      setError(err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId))
  }

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-white mb-6">Reviews</h2>

      {isLoggedIn && (
        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 mb-8">
          <h3 className="text-white font-semibold mb-4">Write a Review</h3>
          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          <div className="mb-4">
            <label className="text-muted text-sm block mb-1">Rating (1–10)</label>
            <input
              type="number"
              min="1"
              max="10"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 w-24 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="text-muted text-sm block mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Share your thoughts..."
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {loading ? (
        <Spinner />
      ) : reviews.length === 0 ? (
        <p className="text-muted text-center py-10">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-card rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium">
                  {review.user?.username || 'Anonymous'}
                </span>
                <StarRating rating={review.rating} />
              </div>
              <p className="text-gray-300 text-sm">{review.comment}</p>
              {user?._id === review.user?._id && (
                <button
                  onClick={() => handleDelete(review._id)}
                  className="text-red-400 text-xs mt-3 hover:text-red-300"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default ReviewSection