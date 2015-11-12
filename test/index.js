var proxyquire = require('proxyquire')
var sinon = require('sinon')
var tap = require('tap')

var stripeHistory = require('../')

var stripeChainableStub = {
  entire: sinon.stub().returnsThis(),
  history: sinon.stub().returnsThis(),
  from: sinon.stub().returnsThis(),
  to: sinon.stub().returnsThis(),
  available: sinon.stub().returnsThis(),
  for: sinon.stub().returnsThis(),
  please: sinon.stub().yields(null, {
    data: []
  })
}

function resetStripeChainableStubs () {
  for (var key in stripeChainableStub) {
    stripeChainableStub[key].reset()
  }
}

tap.test('throws an exception, no opts', function (t) {
  t.throws(function () {
    stripeHistory()
  }, new Error('secretKey must be specified'))

  t.end()
})

tap.test('throws an exception, empty opts', function (t) {
  t.throws(function () {
    stripeHistory({})
  }, new Error('secretKey must be specified'))

  t.end()
})

tap.test('yields an error, invalid secret key', function (t) {
  stripeHistory({
    secretKey: 'secretKey'
  }, function (err) {
    t.equal(err.type, 'StripeAuthenticationError')
    t.end()
  })
})

// Stub 'stripe-chainable'
stripeHistory = proxyquire('../lib/stripe-history', {
  'stripe-chainable': function (key) {
    return stripeChainableStub
  }
})

tap.test('it works!', function (t) {
  stripeHistory({
    secretKey: 'sk_test_x',
    from: new Date(),
    to: new Date(),
    available: true,
    account: 'acct_id'
  }, function (err, history) {
    t.error(err)
    sinon.assert.calledOnce(stripeChainableStub.entire)
    sinon.assert.calledOnce(stripeChainableStub.history)
    sinon.assert.calledOnce(stripeChainableStub.from)
    sinon.assert.calledOnce(stripeChainableStub.to)
    sinon.assert.calledOnce(stripeChainableStub.please)
    sinon.assert.calledOnce(stripeChainableStub.available)
    sinon.assert.calledOnce(stripeChainableStub.for)
    t.end()
    t.tearDown(resetStripeChainableStubs)
  })
})
