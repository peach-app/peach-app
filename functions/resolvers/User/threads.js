module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('thread_users_by_user'), root.ref)),
      q.Lambda('ref', {
        _id: q.Select(['id'], q.Var('ref')),
        ref: q.Var('ref'),
        latestMessage: { text: 'wow' },
      })
    )
  );
};
