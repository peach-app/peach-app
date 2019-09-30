const faunadb = require("faunadb");

module.exports = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET
});
