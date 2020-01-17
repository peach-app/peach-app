const faunadb = require('faunadb');
const q = faunadb.query;

const DocumentDataWithId = document => {
  return q.Let(
    {
      document,
    },
    q.Merge(
      {
        _id: q.Select(['ref', 'id'], q.Var('document')),
        ref: q.Select(['ref'], q.Var('document')),
      },
      q.Select(['data'], q.Var('document'))
    )
  );
};

module.exports = DocumentDataWithId;
