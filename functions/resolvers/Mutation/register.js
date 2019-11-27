module.exports = async (root, args, { client, q }) => {
  const { password, type } = args;
  const email = args.email.toLowerCase();

  return client.query(
    q.Do(
      q.Create(q.Collection('User'), {
        data: {
          email,
          type,
        },
        credentials: { password },
      }),
      q.Login(q.Match(q.Index('user_by_email'), email), {
        password,
      })
    )
  );
};
