module.exports = async (root, { media }, { client, q, activeUserRef }) => {
  const { id, format } = media;

  await client.query(
    q.Create(q.Collection('WorkSample'), {
      data: {
        user: activeUserRef,
        media: {
          id,
          format,
        },
      },
    })
  );

  return true;
};
