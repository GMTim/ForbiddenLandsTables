class Constants {
    get port() { return process.env.PORT }
    get apiKey() { return process.env.APIKEY }
}

class Options {
    constructor() {
        this.constant = new Constants()
    }
}

export default new Options()