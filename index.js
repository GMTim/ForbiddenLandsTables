import dotenv from "dotenv"
dotenv.config()
import express from "express"
import options from "./options.js"
import * as apis from "./api/apis.js"

const app = express()
app.use("/", express.static("html"))
app.use("/api/oracle/helpHaz", apis.oracle.helpHaz)
app.use("/api/oracle/theme", apis.oracle.theme)
app.use("/api/oracle/yesno", apis.oracle.yesno)
app.use("/api/oracle/wilderness/*", apis.oracle.wilderness)
app.use("/api/oracle/kin/*", apis.oracle.kin)
app.use("/api/oracle/kinNames/*", apis.oracle.kinNames)
app.use("/api/oracle/npcThemes", apis.oracle.npcThemes)
app.use("/api/oracle/communityThemes", apis.oracle.communityThemes)

app.listen(options.constant.port, () => {
    console.log(`Listening at http://localhost:${options.constant.port}`)
})