import api from "./api";

const actorService={
    getAll:()=>api.get("/actors"),
    getById:(id)=>api.get(`/actors/${id}`),
    create:(data)=>api.post('/actors',data),
    update:(id,data)=>api.patch(`/actors/${id}`,data),
    delete:(id)=>api.delete(`/actors/${id}`)
}
export default actorService