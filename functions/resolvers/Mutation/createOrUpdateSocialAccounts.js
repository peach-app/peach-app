module.exports = async (
  root,
  { socialAccounts },
  { client, q, DocumentDataWithId }
) => {
  await client.query(
    q.Let(
      {
        id: q.Select(
          '_id',
          DocumentDataWithId(
            q.Get(q.Match(q.Index('social_accounts_by_user'), q.Identity()))
          )
        ),
      },
      q.If(
        q.Exists(q.Ref(q.Collection('SocialAccounts'), q.Var('id'))),
        q.Update(q.Ref(q.Collection('SocialAccounts'), q.Var('id')), {
          data: {
            socialAccounts,
          },
        }),
        q.Create(q.Collection('SocialAccounts'), {
          data: { user: q.Identity(), socialAccounts },
        })
      )
    )
  );

  return true;
};
