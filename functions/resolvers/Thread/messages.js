module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('message_ts_thread_by_thread'), root.ref), {
        size: 30,
      }),
      q.Lambda(['ts', 'ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
