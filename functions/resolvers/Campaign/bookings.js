module.exports = (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(
    q.Map(
      q.Paginate(
        q.Intersection(
          q.Match(q.Index('booking_by_state'), args.state),
          q.Match(q.Index('booking_by_campaign'), root.ref)
        )
      ),
      q.Lambda('ref', DocumentDataWithId(q.Get(q.Var('ref'))))
    )
  );
};
