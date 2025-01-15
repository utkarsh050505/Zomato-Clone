import express from "express"
import cors from "cors"

const app = express()
const port = 4000

// Middleware
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("Working");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})