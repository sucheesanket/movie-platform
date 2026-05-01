import axios from "axios"

const omdb=axios.create({
    baseURL: process.env.OMDB_BASE_URL,
})

export const searchOMDB=async (query)=>{
    const res=await omdb.get("/",{
        params:{
            s:query,
            type:"movie",
            apikey:process.env.OMDB_API_KEY
        },
    })
    if(res.data.Response==="False"){
        return[]

    }
    return res.data.Search
}

export const getOMDBMovie=async(imdbId)=>{
    const  res=await omdb.get("/",{
        params:{
            i:imdbId,
            plot:"full",
            apikey:process.env.OMDB_API_KEY,
        },
    })
    if(res.data.Response==="False"){
        throw new Error("Movie not found on OMDB")
    }
    return res.data
}