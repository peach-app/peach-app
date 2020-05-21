import stripeClient from 'stripe-client';

const secret = {
  development: 'pk_test_vMq0DMaRNOD813Osl9XS2uBu00HmG5yS4d',
  production: 'pk_live_W5F69iL2lXn93thCcqXevUIR00lVBUHDaq',
}[process.env.NODE_ENV];

export const stripe = stripeClient(secret);
