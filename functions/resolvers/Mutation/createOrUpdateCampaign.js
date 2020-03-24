const omit = require('lodash/omit');

module.exports = async (_, { campaign }, { client, q, DocumentDataWithId }) => {
  if (campaign._id) {
    return client.query(
      q.Let(
        {
          campaign: q.Update(q.Ref(q.Collection('Campaign'), campaign._id), {
            data: {
              ...omit(campaign, '_id'),
            },
          }),
        },
        DocumentDataWithId(q.Var('campaign'))
      )
    );
  }

  return client.query(
    q.Let(
      {
        campaign: q.Create(q.Collection('Campaign'), {
          data: {
            ...campaign,
            user: q.Identity(),
          },
        }),
      },
      DocumentDataWithId(q.Var('campaign'))
    )
  );
};
