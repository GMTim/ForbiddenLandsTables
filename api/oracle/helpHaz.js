import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const helpHaz = async (req, res) => {
    const redOrBlack = await random(tables.card.redBlack)
    let result
    switch (redOrBlack.roll) {
        case 1: result = await random(tables.oracle.helpHazRed); break;
        case 2: result = await random(tables.oracle.helpHazBlack); break;
    }
    result.roll = `${redOrBlack.entry.value}:${result.roll}`
    res.send(result)
}

export default helpHaz