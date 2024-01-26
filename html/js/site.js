import navbar from "./navbar.js"
import operator from "./operator.js"
import layout from "./layout.js"

(function($) {
    $.fn.dataId = function(target) {
        if(!target) { return this.attr("data-id") }
        return $(`[data-id="${target}"]`)
    }
})(jQuery)

$(async () => {
    navbar.on(navbar.events.navChanged, (ele) => {
        operator.update(ele.dataId())
    })
})