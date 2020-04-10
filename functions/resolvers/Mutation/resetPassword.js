const { UserInputError } = require('apollo-server-lambda');

module.exports = async (
  root,
  { userId, password },
  { client, q, DocumentDataWithId }
) => {
  const user = await client.query(
    q.Let(
      {
        user: q.Ref(q.Collection('User'), userId),
      },
      q.If(
        q.Exists(q.Var('user')),
        DocumentDataWithId(q.Get(q.Var('user'))),
        null
      )
    )
  );

  if (!user || !user.hasRequestedPasswordReset) {
    throw new UserInputError(
      "Something doesn't look right. Please try requesting a password reset again. "
    );
  }
  await client.query(
    q.Update(q.Ref(q.Collection('User'), userId), {
      data: {
        hasRequestedPasswordReset: false,
      },
      credentials: {
        password,
      },
    })
  );
};
