module.exports = async (root, { url }, { client, q, activeUserRef }) => {
  await client.query(
    q.Create(q.Collection('WorkSample'), {
      data: {
        user: activeUserRef,
        media: {
          url,
        },
      },
    })
  );

  return true;
};
