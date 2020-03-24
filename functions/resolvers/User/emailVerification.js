module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  const emailVerification = await client.query(
    q.Let(
      {
        emailVerification: q.Ref(
          q.Collection('EmailVerification'),
          q.Select(
            ['emailVerificationToken'],
            DocumentDataWithId(q.Get(q.Identity()))
          )
        ),
      },
      DocumentDataWithId(q.Get(q.Var('emailVerification')))
    )
  );
  return emailVerification;
};
