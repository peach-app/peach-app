module.exports = async (root, { id }, { client, q, activeUserRef }) => {
  await client.query(
    q.Let(
      {
        sample: q.Ref(q.Collection('WorkSample'), id),
      },
      q.If(
        q.Equals(
          q.Select(['data', 'user'], q.Get(q.Var('sample'))),
          activeUserRef
        ),
        q.Delete(q.Var('sample')),
        q.Abort('User does not own sample')
      )
    )
  );

  return true;
};
