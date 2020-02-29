module.exports = async (root, { url }, { client, q, DocumentDataWithId }) => {
  await client.query(
    q.Update(q.Identity(), {
      data: {
        avatar: { url },
      },
    })
  );

  return true;
};
