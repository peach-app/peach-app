module.exports = async (_, { campaign }, { client, q, DocumentDataWithId }) => {
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
