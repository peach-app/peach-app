module.exports = async (root, args, { client, q }) => {
  const wow = await client.query(
    q.Let(
      {
        message: q.Get(
          q.Match(q.Index('message_thread_by_thread_by_date'), root.ref)
        ),
      },
      q.Merge(q.Select(['data'], q.Var('message')), {
        _id: q.Select(['ref', 'id'], q.Var('message')),
        ref: q.Select(['ref'], q.Var('message')),
      })
    )
  );

  console.log(wow);

  return wow;
};
