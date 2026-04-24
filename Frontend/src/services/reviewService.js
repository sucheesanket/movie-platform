import api from "./api";

const reviewService={
    getByMovie:(movieId)=>api.get(`/reviews/movie/${movieId}`),
    getMyReviews:()=>api.get("/reviews/my-reviews"),
    create:(data)=>api.post("/reviews",data),
    update:(id,data)=>api.patch(`/reviews/${id}`,data),
    remove:(id)=>api.delete(`/reviews/${id}`),
}
export default reviewService