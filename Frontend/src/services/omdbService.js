import api from "./api.js"

const omdbService = {
  search: (q) => api.get('/omdb/search', { params: { q } }),
  import: (imdbId) => api.post(`/omdb/import/${imdbId}`),
}

export default omdbService