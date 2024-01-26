/**
 * @callback EventHandler
 * @param {JQuery<HTMLElement>} selectedNavItem
 */

function DI(item) { return item.attr("data-id") }

class NavController {
    /** @type {JQuery<HTMLElement>} */
    navlinks
    /** @type {JQuery<HTMLElement>} */
    active
    /**
     * @private
     * @type {object}
     */
    eventStore = {}
    events = Object.freeze({
        navChanged: "navChanged"
    })

    constructor() {
        this.navlinks = $(".navbar-nav .nav-link")
        this.active = $("a.nav-link.active").first()
        this.navlinks.on("click", (e) => {
            e.preventDefault()
            let target = $(e.target)
            if (DI(this.active) == DI(target)) { return }
            this.navlinks.removeClass("active")
            target.addClass("active")
            this.active = target
            this.emit(this.events.navChanged, target)
        })
    }
    /**
     * @param {string} event 
     * @param {EventHandler} handler 
     */
    on(event, handler) {
        if (!this.eventStore[event]) { this.eventStore[event] = [] }
        this.eventStore[event].push(handler)
        switch (event) {
            case this.events.navChanged: handler(this.active)
        }
    }
    /**
     * @private
     * @param {string} event 
     * @param {JQuery<HTMLElement>} value
     */
    emit(event, value) {
        if (!this.eventStore[event]) { return }
        this.eventStore[event].forEach(handler => {
            handler(value)
        })
    }
}

export default new NavController()