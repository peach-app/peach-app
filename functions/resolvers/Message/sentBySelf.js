module.exports = async (root, args, { client, q }) => {
  return client.query(q.Equals(root.user, q.Identity()));
};
