module.exports = async (root, args, { client, q, activeUserRef }) => {
  await client.query(
    q.Update(activeUserRef, {
      data: {
        onboarded: true,
      },
    })
  );

  return true;
};
