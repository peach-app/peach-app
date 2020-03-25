module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  return client.query(
    q.Map(
      q.Filter(
        q.Paginate(q.Match(q.Index('thread_users_by_thread'), root.ref)),
        q.Lambda('ref', q.Not(q.Equals(q.Var('ref'), activeUserRef)))
      ),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
