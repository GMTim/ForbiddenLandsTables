import fetch from "node-fetch"
import opts from "../options.js"

/** @typedef {import('../html/js/models.js').Models} Models */

/**
 * @param {string} table 
 * @return {Models.RandomResponse}
 */
const random = async (table) => {
    const url = `https://bunchofbull.net/apis/random-table/table/fl/${table}/random`
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': opts.constant.apiKey
        }
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Fetching data failed:', error);
    }
}

export default random