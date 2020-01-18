const faunadb = require('faunadb');
const q = faunadb.query;

const formatRefs = refs =>
  refs.map(ref => q.Ref(q.Collection(ref.collection.id), ref.id));

module.exports = formatRefs;
