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
        this.bindButton("theme", "/api/oracle/theme")
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
            const ele = $(await $$.get("/src/result.html"))
            ele.find(".number").text(entry.roll)
            switch(entry.roll[0]) {
                case "♦":
                case "♥": ele.find(".number").addClass("red"); break
                case "♣":
                case "♠": ele.find(".number").addClass("black"); break
            }
            ele.find(".text").text(entry.entry.value)
            this.content.prepend(ele)//`${entry.roll} - ${entry.entry.value}<br />`)
        })
    }
}

export default new Operator()