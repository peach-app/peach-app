module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Merge(
      {
        _id: q.Select(['id'], root.user),
        ref: root.user,
      },
      q.Select(['data'], q.Get(root.user))
    )
  );
};
