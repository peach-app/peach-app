const { UserInputError } = require("apollo-server-lambda");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fauna = require("faunadb");
const q = fauna.query;

module.exports = async (root, args, context) => {
  const { email } = args;

  try {
    const user = await context.fauna.query(
      q.Get(q.Match(q.Index("users_by_email"), email.toLowerCase()))
    );

    const correctPass = bcrypt.compareSync(args.password, user.data.password);

    if (!correctPass) {
      throw "Incorrect credentials.";
    }

    const token = jwt.sign(
      {
        id: user.ref.id
      },
      process.env.JWT_SECRET
    );

    return { jwt: token };
  } catch (err) {
    throw new UserInputError(err);
  }
};
