import dotenv from "dotenv"
dotenv.config()
import express from "express"
import options from "./options.js"

const app = express()
app.use("/", express.static("html"))

app.listen(options.constant.port, () => {
    console.log(`Listening at http://localhost:${options.constant.port}`)
})