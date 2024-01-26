class JQueryPlus {
    /**
     * @param {string|JQuery<HTMLElement>} target 
     * @returns {JQuery<HTMLElement>|string}
     */
    dataId(target) {
        if (!target) { return }
        if (typeof(target) == "string") { return $(`[data-id="${target}"]`) }
        if (typeof(target) == "object") { return $(target).attr("data-id") }
    }
    /**
     * @param {string} url 
     * @returns {Promise<object>}
     */
    async getJSON(url) {
        let data = await this.get(url)
        if (typeof(data) == "object") { return data }
        return JSON.parse(data)
    }
    /**
     * @param {string} url 
     * @returns {Promise<any>}
     */
    async get(url) {
        let fixedURL = url
        if (window.location.pathname != "/" && !url.startsWith("http")) {
            fixedURL = url.replace("/", window.location.pathname)
        }
        return new Promise((res, rej) => {
            $.get(fixedURL, (data) => {
                res(data)
            }).fail((err) => {
                rej(err)
            })
        })
    }
}

export default new JQueryPlus()