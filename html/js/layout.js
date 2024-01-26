class Layout {
    topNav = document.getElementById("nav")
    bottomButtons = document.getElementById("buttons")
    content = document.getElementById("content-wrapper")
    clearButton = document.getElementById("clear-button")
    timeout

    constructor() {
        window.addEventListener("resize", () => { this.debounce(250) })
        this.adjust()
    }
    adjust() {
        const topHeight = this.topNav.offsetHeight
        const bottomHeight = this.bottomButtons.offsetHeight
        this.content.style.paddingTop = `${topHeight}px`
        this.content.style.paddingBottom = `${bottomHeight}px`
        this.clearButton.style.top = `${topHeight+10}px`
    }
    debounce(wait) {
        const later = () => {
            clearTimeout(this.timeout)
            this.adjust()
        }
        if(this.timeout) { clearTimeout(this.timeout) }
        this.timeout = setTimeout(later, wait)
    }
}

export default new Layout()