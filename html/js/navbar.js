class NavController {
    /** @type {JQuery<HTMLElement>} */
    navlinks
    /** @type {JQuery<HTMLElement>} */
    active

    constructor() {
        this.navlinks = $(".navbar-nav .nav-link")
        this.target = this.navlinks.find(e => $(e).hasClass("active"))
        this.navlinks.on("click", (e) => {
            e.preventDefault()
            this.navlinks.removeClass("active")
            let target = $(e.target)
            target.addClass("active")
            this.active = target
        })
    }
}

export default new NavController()