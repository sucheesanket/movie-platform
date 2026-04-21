import express from"express"
import cors from"cors"
import helmet from"helmet"
import morgan from"morgan"
import errorHandler from "./middlewares/errorHandler.js"
import reviewRoutes from "./routes/review.routes.js"
import actorRoutes from "./routes/actor.routes.js"
import genreRoutes from "./routes/genre.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import authRoutes from "./routes/auth.routes.js"




const app=express()
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan("dev"))

app.use("/api/movies",movieRoutes)
app.use("/api/reviews",reviewRoutes)
app.use("/api/genre",genreRoutes)
app.use("/api/actors",actorRoutes)
app.use("/api/auth",authRoutes)

app.get("/",(req,res)=>{
    res.json({
        message:"Movie platform API is runnning"
    })
})

app.use(errorHandler)

export default app