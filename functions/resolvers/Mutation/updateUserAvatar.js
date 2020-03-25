module.exports = async (root, { url }, { client, q, activeUserRef }) => {
  await client.query(
    q.Update(activeUserRef, {
      data: {
        avatar: { url },
      },
    })
  );

  return true;
};
