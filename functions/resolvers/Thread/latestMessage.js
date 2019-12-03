module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Let(
      {
        match: q.Match(q.Index('message_ts_thread_by_thread'), root.ref),
      },
      q.If(
        q.Exists(q.Var('match')),
        DocumentDataWithId(q.Get(q.Var('match'))),
        null
      )
    )
  );
};
