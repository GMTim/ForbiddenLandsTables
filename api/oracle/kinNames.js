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
        case "alderlander":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.alderlanderFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.alderlanderMale); break;
            }
            break
        case "dwarf":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.dwarfFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.dwarfMale); break;
            }
            break
        case "elf":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.elfFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.elfMale); break;
            }
            break
        case "goblin":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.goblinFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.goblinMale); break;
            }
            break
        case "halfling":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.halflingFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.halflingMale); break;
            }
            break
        case "ork":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.orkFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.orkMale); break;
            }
            break
        case "aslene":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.asleneFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.asleneMale); break;
            }
            break
        case "wolfkin":
            switch (suit.roll) {
                case 1:
                case 2: result = await random(tables.oracle.kinNames.wolfkinFemale); break;
                case 3:
                case 4: result = await random(tables.oracle.kinNames.wolfkinMale); break;
            }
            break
        default: res.status(404).send({ error: "Kin Name Not Found" }); return;
    }
    result.roll = `${suit.suit}${result.roll}`
    result.label = [1, 2].includes(suit.roll) ? "Female" : "Male"
    res.send(result)
}

export default wilderness