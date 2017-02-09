var App = require('./app')
var Render = require('./render-vdom')

module.exports = function app (component, root) {
    var render = Render(root)
    return App(render)(component)
}

