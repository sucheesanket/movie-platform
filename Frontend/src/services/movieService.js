
import api from "./api.js"

const movieService={
    getAll:(params)=>api.get("/movies",{params}),
    getById:(id)=>api.get(`/movies/${id}`),
    search:(q)=>api.get("/movies/search",{params:{q}}),
    create:(data)=>api.post("/movies",data),
    update:(id,data)=>api.patch(`/movies/${id}`,data),
    delete:(id)=>api.delete(`/movies/${id}`)

}
export default movieService