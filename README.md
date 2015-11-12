stripe-history
==============

[![npm version](https://badge.fury.io/js/stripe-history.svg)](https://badge.fury.io/js/stripe-history) [![Build Status](https://travis-ci.org/Zertz/stripe-history.svg?branch=master)](https://travis-ci.org/Zertz/stripe-history) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Retrieve Stripe account history

API
---

```javascript
var stripeHistory = require('stripe-history')

stripeHistory({
  secretKey: 'stripe-secret',   // required
  account: 'stripe-account',    // optional, useful for Stripe Connect
  from: new Date(2015, 11, 01), // optional
  to: new Date(2015, 11, 30),   // optional
  available: false              // optional, query available_on instead of created_at
}, function (err, history) {
  /*
    history: {
      charge_count: 0,
      charge_amount: 0,
      refund_count: 0,
      refund_amount: 0,
      adjustment_count: 0,
      adjustment_amount: 0,
      stripe_fee: 0,
      application_fee: 0,
      application_fee_count: 0,
      application_fee_amount: 0,
      application_fee_refund_count: 0,
      application_fee_refund_amount: 0,
      net_amount: 0,
      transfer_count: 0,
      transfer_amount: 0,
      transfer_failure_count: 0,
      transfer_failure_amount: 0,
    }
  */
})
```

License
-------

[MIT](https://github.com/Zertz/stripe-history/blob/master/LICENSE)
