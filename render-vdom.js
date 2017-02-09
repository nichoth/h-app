var vdom = require('virtual-dom')

function Render (rootEl) {
    rootEl = rootEl ||
        document.body.appendChild(document.createElement('div'))
    var _tree
    var el
    return function render (tree) {
        if (!_tree) {
            _tree = tree
            el = rootEl.appendChild(vdom.create(tree))
            return
        }
        var patches = vdom.diff(_tree, tree)
        el = vdom.patch(el, patches)
        _tree = tree
    }
}

module.exports = Render
