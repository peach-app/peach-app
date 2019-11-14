const faunadb = require('faunadb');
const q = faunadb.query;

const { FAUNADB_SECRET } = process.env;

const client = new faunadb.Client({ secret: FAUNADB_SECRET });

module.exports = { client, q };
