module.exports = async (_, args, { client, q }) => {
  console.log('args', args);
  const a = client.query(
    q.Create(q.Collection('Campaign'), {
      data: {
        ...args,
      },
    }),
    q.Merge(
      { _id: q.Select(['id'], q.Var('ref')) },
      q.Select(['data'], q.Get(q.Var('ref')))
    )
  );
  console.log('a', await a);
  return a;
};
