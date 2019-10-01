const { UserInputError } = require("apollo-server-lambda");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fauna = require("faunadb");
const q = fauna.query;

module.exports = async (root, args, context) => {
  const { email } = args;
  const password = bcrypt.hashSync(args.password, 10);

  try {
    const user = await context.fauna.query(
      q.Create(q.Collection("users"), {
        data: {
          email: email.toLowerCase(),
          password
        }
      })
    );

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
