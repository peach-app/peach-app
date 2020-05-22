import stripeClient from 'stripe-client';

const secret = {
  development: 'pk_test_AQz67lEOTOBISjiCPaCvET34001T6XKUXb',
  production: 'pk_live_W5F69iL2lXn93thCcqXevUIR00lVBUHDaq',
}[process.env.NODE_ENV];

export const stripe = stripeClient(secret);
