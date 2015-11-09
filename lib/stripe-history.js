var async = require('async')

function stripeHistory (opts, cb) {
  var stripe = require('stripe-chainable')(opts.secretKey)

  async.series([
    function (cb) {
      var currentHistory = stripe.entire().history().from(opts.from).to(opts.to)

      if (opts.account) {
        currentHistory = currentHistory.for(opts.account)
      }

      currentHistory.please(cb)
    },
    function (cb) {
      var pastHistory = stripe.entire().history().until(opts.from)

      if (opts.account) {
        pastHistory = pastHistory.for(opts.account)
      }

      pastHistory.please(cb)
    }
  ], function (err, results) {
    if (err) {
      return cb(err)
    }

    results[1].data = results[1].data.concat(results[0].data)

    for (var i = 0, iLength = results.length; i < iLength; i++) {
      results[i].net_amount = 0

      for (var j = 0, jLength = results[i].data.length; j < jLength; j++) {
        var amountKey = results[i].data[j].type + '_amount'
        var countKey = results[i].data[j].type + '_count'

        if (!results[i][amountKey]) {
          results[i][amountKey] = 0
          results[i][countKey] = 0
        }

        if (results[i].data[j].type.indexOf('transfer') < 0) {
          results[i].net_amount += results[i].data[j].amount
        }

        results[i][amountKey] += results[i].data[j].amount
        results[i][countKey]++

        if (results[i].data[j].fee_details) {
          for (var k = 0, kLength = results[i].data[j].fee_details.length; k < kLength; k++) {
            var feeKey = results[i].data[j].fee_details[k].type

            if (!results[i][feeKey]) {
              results[i][feeKey] = 0
            }

            results[i].net_amount -= results[i].data[j].fee_details[k].amount
            results[i][feeKey] += results[i].data[j].fee_details[k].amount
          }
        }
      }
    }

    cb(null, {
      current: results[0],
      previous: results[1]
    })
  })
}

module.exports = stripeHistory
