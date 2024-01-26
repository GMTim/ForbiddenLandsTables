/**
 * @namespace Models
 */

/**
 * Represents the range with lower and upper bounds.
 * @typedef {Object} Models.Range
 * @property {number|string} low - The lower bound of the range.
 * @property {number|string} high - The upper bound of the range.
 */

/**
 * Represents an entry with an ID, a range, and a value.
 * @typedef {Object} Models.Entry
 * @property {number} id - The unique identifier for the entry.
 * @property {Models.Range} range - The range object associated with the entry.
 * @property {string} value - The value of the entry.
 */

/**
 * Represents the entire response object which includes a roll and an entry.
 * @typedef {Object} Models.RandomResponse
 * @property {number} roll - The result of the roll.
 * @property {Models.Entry} entry - The entry object associated with the roll.
 */