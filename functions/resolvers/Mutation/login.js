module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Login(q.Match(q.Index('user_by_email'), args.email), {
      password: args.password,
    })
  );
};
