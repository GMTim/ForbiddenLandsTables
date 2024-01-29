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
     * @param {JQuery<HTMLElement>} ele 
     * @param {string} label 
     */
    setLabel: function(ele, label) {
        if (label) {
            const l = ele.find(".label")
            if (!l) { return }
            l.removeClass("d-none")
            l.text(label)
        }
    },
    /**
     * @param {string} url 
     * @param {string} label 
     * @returns {eventHandler}
     */
    chooseCard: function (url, label) {
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
            this.setLabel(ele, label)
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
        this.bindButton("yesno", handlers.chooseCard("/api/oracle/yesno", "Yes / No"))
        this.bindButton("helpHaz", handlers.chooseCard("/api/oracle/helpHaz", "Helpful / Hazardous"))
        this.bindButton("theme", handlers.chooseCard("/api/oracle/theme", "Theme"))
        this.bindDialogButton("wilderness", "/src/questions/wilderness.html", "Wilderness", handlers.chooseCard.bind(handlers))
        this.bindDialogButton("kin", "/src/questions/land.html", "Kin", handlers.chooseCard.bind(handlers))
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
    async bindDialogButton(target, durl, label, handler) {
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
                let btnLabel = $(e.target).text()
                let value = $(e.target).val()
                if (value && Object.keys(json).includes(value)) {
                    let cb = handler(json[value], `${label} - ${btnLabel}`)
                    this.content.prepend(await cb())
                }
            })
            dialog[0].showModal()
        })
    }
}

export default new Operator()