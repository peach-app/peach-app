const stripe = require('stripe')(process.env.STRIPE_SECRET);

if (!process.env.STRIPE_SECRET) {
  console.error(
    `No STRIPE_SECRET found... \nrun: export STRIPE_SECRET=StripePrivateSecret`
  );
}

module.exports = stripe;
