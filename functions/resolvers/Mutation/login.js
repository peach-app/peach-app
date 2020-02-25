const { UserInputError } = require('apollo-server-lambda');

module.exports = async (root, args, { client, q }) => {
  const { password } = args;
  const email = args.email.toLowerCase();

  try {
    const res = await client.query(
      q.Login(q.Match(q.Index('user_by_email'), email), {
        password,
      })
    );

    return res;
  } catch (err) {
    throw new UserInputError('Incorrect email address or password.');
  }
};
