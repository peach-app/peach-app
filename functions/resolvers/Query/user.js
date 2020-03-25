module.exports = (
  root,
  args,
  { client, q, DocumentDataWithId, activeUserRef }
) => {
  return client.query(DocumentDataWithId(q.Get(activeUserRef)));
};
