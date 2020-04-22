/* eslint-disable camelcase */
const { UserInputError } = require('apollo-server-lambda');
const stripe = require('../../helpers/stripe');

module.exports = async (
  root,
  { size: limit, after: starting_after },
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const { stripeID: customer } = await client.query(
    DocumentDataWithId(q.Get(activeUserRef))
  );
  if (!customer) {
    throw new UserInputError('The user is missing a stripeID');
  }
  return stripe.charges.list({
    customer,
    limit,
    starting_after,
  });
};
