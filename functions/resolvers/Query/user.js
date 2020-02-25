module.exports = (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(DocumentDataWithId(q.Get(q.Identity())));
};
