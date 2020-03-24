module.exports = (root, args, { client, q }) => {
  return client.query(
    q.Select(
      'data',
      q.Get(q.Match(q.Index('social_accounts_by_user'), root.ref))
    )
  );
};
