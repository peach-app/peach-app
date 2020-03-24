module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const user = await client.query(
    q.Let(
      {
        ref: q.Ref(q.Collection('User'), args.id),
      },

      DocumentDataWithId(q.Get(q.Var('ref')))
    )
  );

  const hasSocialAccounts = await client.query(
    q.Exists(
      q.Match(
        q.Index('social_accounts_by_user'),
        q.Ref(q.Collection('User'), args.id)
      )
    )
  );

  if (hasSocialAccounts) {
    const socialAccounts = await client.query(
      q.Let(
        {
          socialAccounts: q.Match(
            q.Index('social_accounts_by_user'),
            q.Ref(q.Collection('User'), args.id)
          ),
        },
        DocumentDataWithId(q.Get(q.Var('socialAccounts')))
      )
    );
    console.log('WTF\n', { ...user, ...socialAccounts });
    return { ...user, ...socialAccounts };
  }

  return user;
};

// FOR SOME REASON IF I TRY TO DO IT IN A SINGLE FUNCTION LIKE BELOW
// IT FAILS WHEN THERE IS NO SOCIAL ACCOUNTS
// DESPITE THE q.IF
// WE CAN REVISIT

//  await client.query(
//     q.Let(
//       {
//         ref: q.Ref(q.Collection('User'), args.id),
//         socialAccounts: q.Match(
//           q.Index('social_accounts_by_user'),
//           q.Ref(q.Collection('User'), args.id)
//         ),
//       },
//       q.Merge(
//       DocumentDataWithId(q.Get(q.Var('ref')))
//       q.If(
//         q.Exists(q.Var('socialAccounts')),
//         DocumentDataWithId(q.Get(q.Var('socialAccounts'))),
//         null
//       )
//       )
//     )
//   );
