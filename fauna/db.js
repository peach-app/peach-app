const faunadb = require('faunadb');
const q = faunadb.query;

const { FAUNADB_SECRET } = process.env;

console.log({ FAUNADB_SECRET });

const client = new faunadb.Client({ secret: FAUNADB_SECRET });

module.exports = { client, q };
