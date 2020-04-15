const omit = require('lodash/omit');
const { USER_TYPE } = require('../../consts');
const stripe = require('../../helpers/stripe');

module.exports = async (
  _,
  { campaign, paymentMethod },
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const isBrand = await client.query(
    q.Equals(q.Select(['data', 'type'], q.Get(activeUserRef)), USER_TYPE.BRAND)
  );

  if (!isBrand) {
    throw new Error('User is not a brand');
  }

  if (campaign._id) {
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

  const { id: paymentMethodId } = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: paymentMethod,
    },
  });

  await stripe.paymentIntents.create({
    amount: 500, // Pence for campaign creation cost
    currency: 'gbp',
    confirm: true,
    payment_method: paymentMethodId,
  });

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
