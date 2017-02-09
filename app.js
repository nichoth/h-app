var Model = require('./model')

function App (render) {
    return function app (model) {
        var m = Model(model)
        render(model.view(m.state(), m.msg))
        m.state(function onChange (state) {
            render(model.view(state, m.msg))
        })
    }
}

module.exports = App

