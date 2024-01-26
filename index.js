import dotenv from "dotenv"
dotenv.config()
import express from "express"
import options from "./options.js"
import * as apis from "./api/apis.js"

const app = express()
app.use("/", express.static("html"))
app.use("/oracle/yesno", apis.oracle.yesno)

app.listen(options.constant.port, () => {
    console.log(`Listening at http://localhost:${options.constant.port}`)
})