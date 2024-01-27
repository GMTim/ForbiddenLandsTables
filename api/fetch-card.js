import tables from "./tables.js"
import random from "./fetch-random.js"

/** @returns {Models.RandomResponse} */
const getCard = async () => {
    let suit = await random(tables.card.suit)
    switch(suit.roll) {
        case 1: suit.suit = "♦"; break;
        case 2: suit.suit = "♥"; break;
        case 3: suit.suit = "♣"; break;
        case 4: suit.suit = "♠"; break;
    }
    return suit
}

export default getCard