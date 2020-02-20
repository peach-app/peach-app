module.exports = async (root, args, { client, q }) => {
  await client.query(
    q.Update(q.Identity(), {
      data: args.user,
    })
  );

  return true;
};
