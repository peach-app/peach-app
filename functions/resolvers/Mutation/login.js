module.exports = async (root, args, { client, q }) => {
  const { password } = args;
  const email = args.email.toLowerCase();
  return client.query(
    q.Login(q.Match(q.Index('user_by_email'), email), {
      password,
    })
  );
};
