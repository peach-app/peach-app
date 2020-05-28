const omit = require('lodash/omit');
const { UserInputError } = require('apollo-server-lambda');
const { USER_TYPE } = require('../../consts');

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

  if (!campaign.unpaid && campaign.budget < 500) {
    throw new UserInputError('Budget must be over £5.00 for paid campaigns');
  }

  if (campaign.unpaid && campaign.budget > 0) {
    throw new UserInputError('Unpaid campaigns must have a budget of 0');
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
                ...omit(campaign, ['_id', 'private', 'unpaid']),
              },
            })
          ),

          q.Abort('You are not the owner of this campaign')
        )
      )
    );
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
