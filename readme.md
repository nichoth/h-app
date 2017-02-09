# h-app

Elm-like app for javascript.

Inspired by hyper-app, the difference being that the state machine is decoupled from the view. The default here is using `virtual-dom`, but it is easy to use with another renderer.


## example

app.js

```js
var Counter = require('./counter')
var app = require('../')

app(Counter)
```

counter.js

```js
var h = require('../h')

var Counter = function () {
    return { count: 0, input: '' }
}
Counter.update = {
    plusOne: state => ({ count: state.count + 1 }),
    minusOne: state => ({ count: state.count - 1 }),
    add: (state, ev) => ({
        count: state.count + parseInt(state.input, 10),
        input: ''
    }),
    input: (state, ev) => ({ input: ev })
}
Counter.effects = {
    asyncAdd: (state, msg, ev) => {
        process.nextTick(() => msg.add(ev))
    }
}

Counter.view = function (state, msg) {
    return h('div', {}, [
        'the count is ' + state.count,
        h('hr'),
        h('button', { onclick: msg.plusOne }, 'add one'),
        h('hr'),
        h('button', { onclick: msg.minusOne }, 'subtract one'),
        h('hr'),
        h('input', {
            type: 'number',
            value: state.input,
            onchange: ev => msg.input(ev.target.value),
            placeholder: 'add n'
        }),
        h('button', { onclick: msg.add }, 'submit')
    ])
}

module.exports = Counter
```
