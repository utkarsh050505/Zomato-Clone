import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"

const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors())

//DB
connectDB()

//API endpoints
app.use("/api/food", foodRouter);

app.get('/', (req, res) => {
    res.send("Working");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

// mongodb+srv://zomato-clone:<db_password>@cluster0.djqdh.mongodb.net/?