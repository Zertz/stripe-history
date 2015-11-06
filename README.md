stripe-history
==============

[![npm version](https://badge.fury.io/js/stripe-history.svg)](https://badge.fury.io/js/stripe-history) [![Build Status](https://travis-ci.org/Zertz/stripe-history.svg?branch=master)](https://travis-ci.org/Zertz/stripe-history) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Retrieve Stripe account history

API
---

```javascript
var stripeHistory = require('stripe-history')

stripeHistory({
  secretKey: 'stripe-secret',
  account: 'stripe-account',
  from: new Date(2015, 11, 01),
  to: new Date(2015, 11, 30)
}, function (err, history) {
  console.log(history)
})
```

License
-------

[MIT](https://github.com/Zertz/stripe-history/blob/master/LICENSE)
