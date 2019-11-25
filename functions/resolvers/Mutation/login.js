module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Login(q.Match(q.Index('unique_user_email'), args.email), {
      password: args.password,
    })
  );
};
