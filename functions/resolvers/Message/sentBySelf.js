module.exports = async (root, args, { client, q, activeUserRef }) => {
  return client.query(q.Equals(root.user, activeUserRef));
};
