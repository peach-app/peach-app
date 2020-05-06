const omit = require('lodash/omit');
const { USER_TYPE } = require('../../consts');
const stripe = require('../../helpers/stripe');

module.exports = async (
  _,
  { campaign },
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const isBrand = await client.query(
    q.Equals(q.Select(['data', 'type'], q.Get(activeUserRef)), USER_TYPE.BRAND)
  );

  if (!isBrand) {
    throw new Error('User is not a brand');
  }

  if (campaign._id) {
    // Stop function here if performing an update
    return client.query(
      q.Let(
        {
          campaign: q.Ref(q.Collection('Campaign'), campaign._id),
        },
        q.If(
          q.Equals(
            activeUserRef,
            q.Select(['data', 'user'], q.Get(q.Var('campaign')))
          ),

          DocumentDataWithId(
            q.Update(q.Ref(q.Collection('Campaign'), campaign._id), {
              data: {
                ...omit(campaign, ['_id', 'private']),
              },
            })
          ),

          q.Abort('You are not the owner of this campaign')
        )
      )
    );
  }

  const { status } = await stripe.paymentIntents.retrieve(campaign.paymentId);

  if (status !== 'succeeded') {
    throw new Error('The campaign fee has not been paid');
  }

  return client.query(
    DocumentDataWithId(
      q.Create(q.Collection('Campaign'), {
        data: {
          ...campaign,
          user: activeUserRef,
        },
      })
    )
  );
};
