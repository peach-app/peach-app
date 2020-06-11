module.exports = async (root, { media }, { client, q, activeUserRef }) => {
  const { id, format } = media;

  await client.query(
    q.Update(activeUserRef, {
      data: {
        avatar: { id, format },
      },
    })
  );

  return true;
};
