module.exports = async (root, args, { client, q }) => {
  await client.query(
    q.Update(q.Identity(), {
      data: {
        name: args.name,
      },
    })
  );

  return true;
};
