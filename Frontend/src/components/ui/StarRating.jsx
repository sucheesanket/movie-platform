function StarRating({ rating, max = 10 }) {
  const stars = Math.round((rating / max) * 5)
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`text-lg ${s <= stars ? 'text-yellow-400' : 'text-gray-600'}`}
        >
          ★
        </span>
      ))}
      <span className="text-muted text-sm ml-1">{rating}/10</span>
    </div>
  )
}
export default StarRating