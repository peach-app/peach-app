module.exports = async (root, args, { client, q }) => {
  const { password } = args;
  const email = args.email.toLowerCase();
  const z = await client.query(
    q.Login(q.Match(q.Index('user_by_email'), email), {
      password,
    })
  );
  console.log('ssss', z);
  return z;
};
