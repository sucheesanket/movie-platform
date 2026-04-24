import api from "./api";

const authService={
    register:(data)=>api.post("/auth/register",data),
    login:(data)=>api.post("/auth/login",data),
    getMe:()=>api.get("/auth/get-me"),
    updatePassword:(data)=>api.patch("/auth/update-password",data),
    addToWatchlist:(movieId)=>api.post(`/auth/watchlist/${movieId}`),
    removeFromWatchlist:(movieId)=>api.delete(`/auth/watchlist/${movieId}`)
}

export default authService