module.exports = async (root, args, { client, q }) => {
  return client.query(
    q.Map(
      root.categories || [],
      q.Lambda('ref', q.Select(['id'], q.Var('ref')))
    )
  );
};
