import { configureStore } from "@reduxjs/toolkit";

import reviewReducer from "./Slices/reviewSlices.js"
import movieReducer from "./Slices/movieSlices.js"
import authReducer from "./Slices/authSlices.js"
import actorReducer from "./Slices/actorSlices.js"

const store=configureStore({
    reducer:{
        movies:movieReducer,
        actors:actorReducer,
        review:reviewReducer,
        auth:authReducer
    }
})

export default store