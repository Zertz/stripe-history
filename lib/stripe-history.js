function stripeHistory (opts, cb) {
  if (!opts || !opts.secretKey) {
    throw new Error('secretKey must be specified')
  }

  var stripe = require('stripe-chainable')(opts.secretKey)

  var history = stripe.entire().history()

  if (opts.from) {
    history = history.from(opts.from)
  }

  if (opts.to) {
    history = history.to(opts.to)
  }

  if (!opts.from && !opts.to) {
    history = history.until().now()
  }

  if (opts.available) {
    history = history.available()
  }

  if (opts.account) {
    history = history.for(opts.account)
  }

  history.please(function (err, history) {
    if (err) {
      return cb(err)
    }

    history.net_amount = 0

    for (var i = 0, iLength = history.data.length; i < iLength; i++) {
      var amountKey = history.data[i].type + '_amount'
      var countKey = history.data[i].type + '_count'

      if (!history[amountKey]) {
        history[amountKey] = 0
        history[countKey] = 0
      }

      if (history.data[i].type.indexOf('transfer') < 0) {
        history.net_amount += history.data[i].amount
      }

      history[amountKey] += history.data[i].amount
      history[countKey]++

      if (history.data[i].fee_details) {
        for (var j = 0, jLength = history.data[i].fee_details.length; j < jLength; j++) {
          var feeKey = history.data[i].fee_details[j].type

          if (!history[feeKey]) {
            history[feeKey] = 0
          }

          history.net_amount -= history.data[i].fee_details[j].amount
          history[feeKey] += history.data[i].fee_details[j].amount
        }
      }
    }

    cb(null, history)
  })
}

module.exports = stripeHistory
