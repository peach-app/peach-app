module.exports = async (root, { socialAccounts }, { client, q }) => {
  await client.query(
    q.Let(
      {
        ref: q.Match(q.Index('social_accounts_by_user'), q.Identity()),
      },
      q.If(
        q.Exists(q.Var('ref')),
        q.Update(q.Var('ref'), {
          data: {
            socialAccounts,
          },
        }),
        q.Create(q.Collection('SocialAccounts'), {
          data: {
            user: q.Identity(),
            socialAccounts,
          },
        })
      )
    )
  );

  return true;
};
