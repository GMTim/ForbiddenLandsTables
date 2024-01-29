import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"
import card from "../fetch-card.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const wilderness = async (req, res) => {
    const pathParts = req.originalUrl.split("/")
    const path = pathParts[pathParts.length - 1]
    let result
    switch (path) {
        case "forests": result = await random(tables.oracle.wilderness.forests); break;
        case "mountains": result = await random(tables.oracle.wilderness.mountains); break;
        case "marshes": result = await random(tables.oracle.wilderness.quagmires); break;
        case "waterways": result = await random(tables.oracle.wilderness.waterways); break;
        default: res.status(404).send({error: "Wilderness Not Found"}); return;
    }
    const suit = await card()
    result.roll = `${suit.suit}${result.roll}`
    res.send(result)
}

export default wilderness