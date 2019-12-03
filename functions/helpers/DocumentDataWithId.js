const faunadb = require('faunadb');
const q = faunadb.query;

const DocumentDataWithId = document => {
  return q.Merge(
    {
      _id: q.Select(['ref', 'id'], document),
      ref: q.Select(['ref'], document),
    },
    q.Select(['data'], document)
  );
};

module.exports = DocumentDataWithId;
