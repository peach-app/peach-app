module.exports = async (root, args, { client, q }) => {
  const { name, password, type } = args;
  const email = args.email.toLowerCase();

  return client.query(
    q.Do(
      q.Create(q.Collection('User'), {
        data: {
          name,
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
