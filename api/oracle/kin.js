import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"
import card from "../fetch-card.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const wilderness = async (req, res) => {
    const suit = await card()
    const pathParts = req.originalUrl.split("/")
    const path = pathParts[pathParts.length - 1]
    let result
    switch (path) {
        case "ravenlands":
            switch (suit.roll) {    
                case 1:
                case 2: result = await random(tables.oracle.kin.ravenlandsRed); break;
                case 3:
                case 4: result = await random(tables.oracle.kin.ravenlandsBlack); break;
            }
            break
        case "bitterReach": result = await random(tables.oracle.kin.bitterReach); break;
        case "aslene": result = await random(tables.oracle.kin.aslene); break;
        default: res.status(404).send({error: "Land Not Found"}); return;
    }
    result.roll = `${suit.suit}${result.roll}`
    res.send(result)
}

export default wilderness