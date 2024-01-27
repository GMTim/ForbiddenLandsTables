import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"
import card from "../fetch-card.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const theme = async (req, res) => {
    const suit = await card()
    let result
    switch (suit.roll) {
        case 1: result = await random(tables.oracle.themeDiamonds); break;
        case 2: result = await random(tables.oracle.themeHearts); break;
        case 3: result = await random(tables.oracle.themeClubs); break;
        case 4: result = await random(tables.oracle.themeSpades); break;
    }
    
    result.roll = `${suit.suit}${result.roll}`
    res.send(result)
}

export default theme