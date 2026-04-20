import "dotenv/config"
import connectToDB from "./config/database.js"
import movieModel from "./models/movie.model.js"
import genreModel from "./models/genre.model.js"

connectToDB()

const genre=await genreModel.create({ name:"Drama"})

const movie=await movieModel.create({
    title:"The shawshank Redemption",
    releaseYear:1994,
    description:"Two imprisioned men bond over years.",
    director:"Frank Darabont",
    genres:[genre._id]
})
console.log("created :",movie.title);
process.exit()
