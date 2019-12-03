module.exports = async (_, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Let(
      {
        campaign: q.Create(q.Collection('Campaign'), {
          data: {
            ...args,
          },
        }),
      },
      DocumentDataWithId(q.Var('campaign'))
    )
  );
};
