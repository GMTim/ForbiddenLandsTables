import navbar from "./navbar.js"

$(async () => {
    navbar.on(navbar.events.navChanged, (ele) => {
        console.log(ele.attr("data-id"))
    })
})