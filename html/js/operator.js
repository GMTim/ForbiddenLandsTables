import $$ from './jQueryPlus.js'
import layout from './layout.js'
/** @typedef {import('./models.js').Models} Models */

class Operator {
    content = $("#main-content")

    constructor() {
        $("#clear-button").on("click", (e) => {
            e.preventDefault()
            this.content.text("")
        })
    }

    async update(target) {
        switch (target) {
            case "oracle": await this.loadOracle()
        }
    }
    /** @private */
    async loadOracle() {
        await this.replaceButtons("oracle/buttons.html")
        $$.dataId("yesno").on("click", async (e) => {
            e.preventDefault()
            /** @type {Models.RandomResponse} */
            const entry = await $$.getJSON(`/api/oracle/yesno`)
            this.content.prepend(`${entry.roll} - ${entry.entry.value}<br />`)
        })
    }
    async replaceButtons(file) {
        const buttons = await $$.get(`/src/${file}`)
        $('#buttons').children().remove()
        $('#buttons').html(buttons)
        layout.adjust()
    }
}

export default new Operator()