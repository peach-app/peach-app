module.exports = async (root, args, { client, q }) => {
  await client.query(
    q.Update(q.Ref(q.Collection('Booking'), args.id), {
      data: {
        state: args.state,
      },
    })
  );

  return true;
};
