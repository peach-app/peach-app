module.exports = async (_, args, { client, q, DocumentDataWithId }) => {
  const { campaign } = args;

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
