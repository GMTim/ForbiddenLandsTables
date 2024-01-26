import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const helpHaz = async (req, res) => {
    const suit = await random(tables.card.suit)
    let result
    switch (suit.roll) {
        case 1: result = await random(tables.oracle.genEncDiamonds); break;
        case 2: result = await random(tables.oracle.genEncHearts); break;
        case 3: result = await random(tables.oracle.genEncClubs); break;
        case 4: result = await random(tables.oracle.genEncSpades); break;
    }
    result.roll = `${suit.entry.value}:${result.roll}`
    res.send(result)
}

export default helpHaz