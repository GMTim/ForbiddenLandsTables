import express from "express"
import random from "../fetch-random.js"
import tables from "../tables.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */
const yesno = async (req, res) => {
    const redOrBlack = await random(tables.card.suit)
    let result
    switch (redOrBlack.roll) {
        case 1: result = await random(tables.oracle.yesNoRed); break;
        case 2: result = await random(tables.oracle.yesNoBlack); break;
    }
    result.roll = `${redOrBlack.entry.value}:${result.roll}`
    res.send(result)
}

export default yesno