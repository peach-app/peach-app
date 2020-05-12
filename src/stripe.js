import stripeClient from 'stripe-client';

const secret = {
  development: 'pk_test_1N9AOYZFpC5gIU4DI9Rnd2DV009ew3jAaR',
  production: 'pk_live_W5F69iL2lXn93thCcqXevUIR00lVBUHDaq',
}[process.env.NODE_ENV];

export const stripe = stripeClient(secret);
