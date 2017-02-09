var xtend = require('xtend')
var struct = require('observ-struct')

function Model (model) {
    var state = struct(model())
    var update = model.update
    var effects = model.effects || {}
    var subs = model.subs || []

    var keys = Object.keys(xtend(update, effects))
    var msgs = keys.reduce(function (acc, k) {
        acc[k] = function msg (ev) {
            if (effects[k]) return effects[k](state(), msgs, ev)
            var newState = update[k](state(), ev)
            state.set(xtend(state(), newState))
        }
        return acc
    }, {})

    subs.forEach(function (sub) {
        sub(state(), msgs)
    })

    return {
        msg: msgs,
        state: state
    }
}

module.exports = Model
