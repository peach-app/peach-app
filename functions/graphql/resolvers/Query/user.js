const faunadb = require("faunadb");
const q = faunadb.query;

module.exports = async (root, args, context) => {
  const user = await context.fauna.query(
    q.Get(q.Ref(q.Class("users"), context.user.id))
  );

  return user.data;
};
