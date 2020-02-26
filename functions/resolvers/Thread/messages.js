const head = require('lodash/fp/head');

module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { size = 30, after, before } = args;

  const res = await client.query(
    q.Map(
      q.Paginate(q.Match(q.Index('message_by_thread'), root.ref), {
        size,
        ...(after && { after }),
        ...(before && { before }),
      }),
      q.Lambda(['ref'], DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );

  return {
    ...res,
    after: head(res.after),
    before: head(res.before),
  };
};
