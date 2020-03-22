module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const { socialAccounts } = await client.query(
    q.Select(
      'data',
      q.Get(q.Match(q.Index('social_accounts_by_user'), q.Identity()))
    )
  );
  return socialAccounts;
};
