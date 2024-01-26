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
        this.bindButton("yesno", "/api/oracle/yesno")
        this.bindButton("helpHaz", "/api/oracle/helpHaz")
    }
    async replaceButtons(file) {
        const buttons = await $$.get(`/src/${file}`)
        $('#buttons').children().remove()
        $('#buttons').html(buttons)
        layout.adjust()
    }
    async bindButton(target, url) {
        $$.dataId(target).on("click", async (e) => {
            e.preventDefault()
            /** @type {Models.RandomResponse} */
            const entry = await $$.getJSON(url)
            this.content.prepend(`${entry.roll} - ${entry.entry.value}<br />`)
        })
    }
}

export default new Operator()