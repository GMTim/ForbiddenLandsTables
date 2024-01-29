import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"
import card from "../fetch-card.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const communityThemes = async (req, res) => {
    const suit = await card()
    let result
    switch (suit.roll) {
        case 1:
        case 2: result = await random(tables.oracle.npcThemes.diamonds); break;
        case 3:
        case 4: result = await random(tables.oracle.npcThemes.clubs); break;
    }
    
    result.roll = `${suit.suit}${result.roll}`
    res.send(result)
}

export default communityThemes