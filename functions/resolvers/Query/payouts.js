/* eslint-disable camelcase */
const { UserInputError } = require('apollo-server-lambda');
const stripe = require('../../helpers/stripe');
const { USER_TYPE } = require('../../consts');

module.exports = async (
  root,
  { size: limit, after: starting_after },
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const { type, stripeID: customer } = await client.query(
    DocumentDataWithId(q.Get(activeUserRef))
  );

  if (!customer) {
    throw new UserInputError('The user is missing a stripeID');
  }

  if (type === USER_TYPE.INFLUENCER) {
    return stripe.payouts.list(
      {
        limit,
        starting_after,
      },
      { stripeAccount: customer }
    );
  }

  return stripe.charges.list({
    customer,
    limit,
    starting_after,
  });
};
