import "dotenv/config"
import app from "./src/app.js"
import connectToDB from "./src/config/database.js"
connectToDB()
const PORT=process.env.PORT||3000
app.listen(PORT,()=>{
    console.log(`The server is running on port number ${PORT}`);
    
})