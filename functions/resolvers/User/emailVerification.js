module.exports = async (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  const emailVerification = await client.query(
    q.Let(
      {
        emailVerification: q.Ref(
          q.Collection('EmailVerification'),
          q.Select(
            ['emailVerificationToken'],
            DocumentDataWithId(q.Get(activeUserRef))
          )
        ),
      },
      DocumentDataWithId(q.Get(q.Var('emailVerification')))
    )
  );
  return emailVerification;
};
