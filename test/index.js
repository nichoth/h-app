var test = require('tape')
var Model = require('../model')
var Counter = require('../example/counter')

test('model', function (t) {
    t.plan(2)
    var counter = Model(Counter)

    t.deepEqual(counter.state(), {
        input: '',
        count: 0
    }, 'should have init state')

    counter.state(function onChange (state) {
        t.deepEqual(state, {
            count: 1,
            input: ''
        }, 'should broadcast state changes')
    })
    counter.msg.plusOne()
})

