module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Merge(
      {
        _id: q.Select(['id'], q.Identity()),
      },
      q.Select(['data'], q.Get(q.Identity()))
    )
  );
};
