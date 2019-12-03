module.exports = async (root, args, { client, q, DocumentDataWithId }) => {
  return client.query(DocumentDataWithId(q.Get(root.user)));
};
