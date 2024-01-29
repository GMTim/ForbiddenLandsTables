import $$ from './jQueryPlus.js'
import layout from './layout.js'
/** @typedef {import('./models.js').Models} Models */

/**
 * @callback eventHandler
 * @async
 * @returns {JQuery<HTMLElement>}
 */
/**
 * @callback eventMapper
 * @returns {eventHandler}
 */

const handlers = {
    /**
     * @param {string} url 
     * @returns {eventHandler}
     */
    chooseCard: function (url) {
        return async () => {
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
            return ele
        }
    }
}

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
        this.bindButton("yesno", handlers.chooseCard("/api/oracle/yesno"))
        this.bindButton("helpHaz", handlers.chooseCard("/api/oracle/helpHaz"))
        this.bindButton("theme", handlers.chooseCard("/api/oracle/theme"))
        this.bindDialogButton("wilderness", "/src/questions/wilderness.html", handlers.chooseCard.bind(handlers))
    }
    async replaceButtons(file) {
        const buttons = await $$.get(`/src/${file}`)
        $('#buttons').children().remove()
        $('#buttons').html(buttons)
        layout.adjust()
    }
    /**
     * @param {string} target 
     * @param {function} handler 
     */
    async bindButton(target, handler) {
        $$.dataId(target).on("click", async (e) => {
            e.preventDefault()
            this.content.prepend(await handler())
        })
    }
    async bindDialogButton(target, durl, handler) {
        $$.dataId(target).on("click", async (e) => {
            e.preventDefault()
            /** @type { JQuery<HTMLElement> } */
            const dialog = $(await $$.get(durl))
            const json = JSON.parse(dialog.children("#json").text())
            $("body").append(dialog)
            $(".btn-choice").on("click", async (e) => {
                e.preventDefault()
                dialog[0].close()
                dialog.remove()
                let value = $(e.target).val()
                if (value && Object.keys(json).includes(value)) {
                    let cb = handler(json[value])
                    this.content.prepend(await cb())
                }
            })
            dialog[0].showModal()
        })
    }
}

export default new Operator()